#!/usr/bin/env bash
set -Eeuo pipefail

readonly REGION="ap-south-1"
readonly DB_INSTANCE="taskflow-production-db"
readonly TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
readonly SNAPSHOT_ID="${DB_INSTANCE}-manual-${TIMESTAMP}"

echo "Creating RDS snapshot: ${SNAPSHOT_ID}"

aws rds create-db-snapshot \
  --region "$REGION" \
  --db-instance-identifier "$DB_INSTANCE" \
  --db-snapshot-identifier "$SNAPSHOT_ID" \
  --tags \
    Key=Project,Value=TaskFlow \
    Key=Environment,Value=production \
    Key=Purpose,Value=manual-backup

echo "Waiting for snapshot to become available..."

aws rds wait db-snapshot-available \
  --region "$REGION" \
  --db-snapshot-identifier "$SNAPSHOT_ID"

STATUS="$(
  aws rds describe-db-snapshots \
    --region "$REGION" \
    --db-snapshot-identifier "$SNAPSHOT_ID" \
    --query 'DBSnapshots[0].Status' \
    --output text
)"

if [[ "$STATUS" != "available" ]]; then
  echo "ERROR: Snapshot ${SNAPSHOT_ID} status is ${STATUS}" >&2
  exit 1
fi

echo "SUCCESS: Snapshot is available."
echo "Snapshot ID: ${SNAPSHOT_ID}"
echo "Region: ${REGION}"
