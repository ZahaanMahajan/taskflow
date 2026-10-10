I've written `obs-forward.sh`, which runs all three port-forwards in the background from one terminal. It passed a bash syntax check, but I couldn't run it against a cluster here, so try it on yours.

Save it, make it executable, and run it:

```bash
chmod +x obs-forward.sh
./obs-forward.sh start
```

| Command | What it does |
|---|---|
| `./obs-forward.sh start` | Starts all three (Grafana on 3000, Alertmanager on 9093, Prometheus on 9090) |
| `./obs-forward.sh restart prometheus` | Restarts only that forward |
| `./obs-forward.sh stop` | Stops all, or name one: `stop grafana` |
| `./obs-forward.sh status` | Shows which forwards are running, with their PIDs and URLs |
| `./obs-forward.sh logs grafana` | Tails that forward's log |

The dashed flag style works too, e.g. `./obs-forward.sh --restart grafana`. Names are `grafana`, `alertmanager` and `prometheus`, and you can list several, e.g. `restart grafana prometheus`.

- **Auto-reconnect:** each forward runs under a small loop that restarts `kubectl port-forward` after 2 seconds if it drops, for example when a pod restarts. Because of this you'll rarely need `restart`, but it's there when you want to force one.
- **Where state lives:** PID files and logs are in `~/.local/state/obs-forward/`. If a forward isn't coming up, check `logs <name>`, since a common cause is something already using that port.
- **Namespace override:** the namespace defaults to `observability`. To use another, run `NAMESPACE=other ./obs-forward.sh start`.
- **Stopping:** the forwards keep running after you close the terminal. Run `./obs-forward.sh stop` when you're done.
