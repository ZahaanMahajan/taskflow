#!/usr/bin/env bash
# obs-forward.sh - manage observability port-forwards from a single terminal.
#
# Usage:
#   ./obs-forward.sh start   [name...]   start all (or named) forwards in background
#   ./obs-forward.sh stop    [name...]   stop all (or named) forwards
#   ./obs-forward.sh restart [name...]   restart all (or named) forwards
#   ./obs-forward.sh status              show what's running
#   ./obs-forward.sh logs    <name>      tail the log of one forward
#
# Names: grafana | alertmanager | prometheus
# Flag style also works: --start, --restart grafana, --status, etc.
# Env: NAMESPACE (default: observability)
#
# Each forward runs under a small supervisor loop, so if kubectl drops
# (pod restart, network blip) it reconnects automatically after 2s.

set -u

NAMESPACE="${NAMESPACE:-observability}"
STATE_DIR="${XDG_STATE_HOME:-$HOME/.local/state}/obs-forward"
SCRIPT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/$(basename "${BASH_SOURCE[0]}")"
ALL=(grafana alertmanager prometheus)
mkdir -p "$STATE_DIR"

# name -> "service local_port remote_port"
spec() {
  case "$1" in
    grafana)      echo "monitoring-grafana 3000 80" ;;
    alertmanager) echo "monitoring-alertmanager 9093 9093" ;;
    prometheus)   echo "monitoring-prometheus 9090 9090" ;;
    *) return 1 ;;
  esac
}

pidfile() { echo "$STATE_DIR/$1.pid"; }
logfile() { echo "$STATE_DIR/$1.log"; }

is_running() {
  local pf; pf="$(pidfile "$1")"
  [[ -f "$pf" ]] && kill -0 "$(cat "$pf")" 2>/dev/null
}

# Internal: supervisor loop (runs in background)
run_loop() {
  local name="$1" svc lport rport child=""
  read -r svc lport rport <<<"$(spec "$name")"
  local log; log="$(logfile "$name")"
  trap '[[ -n "$child" ]] && kill "$child" 2>/dev/null; exit 0' TERM INT
  while true; do
    echo "[$(date '+%F %T')] starting svc/$svc $lport:$rport" >>"$log"
    kubectl port-forward -n "$NAMESPACE" "svc/$svc" "$lport:$rport" >>"$log" 2>&1 &
    child=$!
    wait "$child"
    echo "[$(date '+%F %T')] exited, retrying in 2s" >>"$log"
    sleep 2 &
    child=$!
    wait "$child"
  done
}

start_one() {
  local name="$1" svc lport rport
  if is_running "$name"; then
    echo "• $name: already running (pid $(cat "$(pidfile "$name")"))"
    return
  fi
  read -r svc lport rport <<<"$(spec "$name")"
  nohup "$SCRIPT" _run "$name" >/dev/null 2>&1 &
  echo $! >"$(pidfile "$name")"
  echo "✓ $name: started -> http://localhost:$lport"
}

stop_one() {
  local name="$1" pf pid
  pf="$(pidfile "$name")"
  if ! is_running "$name"; then
    rm -f "$pf"
    echo "• $name: not running"
    return
  fi
  pid="$(cat "$pf")"
  kill "$pid" 2>/dev/null
  for _ in {1..20}; do kill -0 "$pid" 2>/dev/null || break; sleep 0.1; done
  kill -9 "$pid" 2>/dev/null
  rm -f "$pf"
  echo "✓ $name: stopped"
}

status() {
  local name svc lport rport
  for name in "${ALL[@]}"; do
    read -r svc lport rport <<<"$(spec "$name")"
    if is_running "$name"; then
      printf "● %-13s running  pid %-7s http://localhost:%s\n" "$name" "$(cat "$(pidfile "$name")")" "$lport"
    else
      printf "○ %-13s stopped  (port %s)\n" "$name" "$lport"
    fi
  done
}

# Resolve target names (default: all), validating each
targets() {
  if [[ $# -eq 0 ]]; then printf '%s\n' "${ALL[@]}"; return; fi
  local n
  for n in "$@"; do
    spec "$n" >/dev/null || { echo "Unknown target: $n (use: ${ALL[*]})" >&2; exit 1; }
    echo "$n"
  done
}

usage() { sed -n '2,15p' "$SCRIPT" | sed 's/^# \{0,1\}//'; }

cmd="${1:-start}"
shift || true
cmd="${cmd#--}"; cmd="${cmd#-}"

case "$cmd" in
  _run)    run_loop "$1" ;;
  start)   command -v kubectl >/dev/null || { echo "kubectl not found" >&2; exit 1; }
           for n in $(targets "$@"); do start_one "$n"; done ;;
  stop)    for n in $(targets "$@"); do stop_one "$n"; done ;;
  restart) command -v kubectl >/dev/null || { echo "kubectl not found" >&2; exit 1; }
           for n in $(targets "$@"); do stop_one "$n"; start_one "$n"; done ;;
  status)  status ;;
  logs)    [[ $# -eq 1 ]] || { echo "Usage: $0 logs <name>" >&2; exit 1; }
           spec "$1" >/dev/null || { echo "Unknown target: $1" >&2; exit 1; }
           tail -f "$(logfile "$1")" ;;
  help|h)  usage ;;
  *)       usage; exit 1 ;;
esac
