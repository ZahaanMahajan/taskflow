import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "https://taskflow.aws.zahaan.online";

export const options = {
  stages: [
    { duration: "15s", target: 5 },
    { duration: "15s", target: 10 },
    { duration: "15s", target: 15 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
  },
};

export default function () {
  // 1. Load the dashboard's todo list.
  const listResponse = http.get(`${BASE_URL}/api/todos`);

  check(listResponse, {
    "list returns 200": (r) => r.status === 200,
  });

  // 2. Create a todo using the real frontend's payload format.
  const payload = JSON.stringify({
    title: `k6-load-${__VU}-${__ITER}-${Date.now()}`,
    description: "TaskFlow controlled performance test",
    priority: "MEDIUM",
    status: "PENDING",
  });

  const createResponse = http.post(`${BASE_URL}/api/todos`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  check(createResponse, {
    "create returns 200": (r) => r.status === 200,
    "created todo has an ID": (r) => {
      try {
        return Number.isInteger(createResponse.json("id"));
      } catch (_) {
        return false;
      }
    },
  });

  // 3. Refresh the list, as the React app does after creation.
  const refreshResponse = http.get(`${BASE_URL}/api/todos`);

  check(refreshResponse, {
    "refresh returns 200": (r) => r.status === 200,
  });

  sleep(1);
}
