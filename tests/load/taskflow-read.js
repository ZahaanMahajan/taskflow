import http from "k6/http";
import { check } from "k6";

const BASE_URL = __ENV.BASE_URL || "https://taskflow.aws.zahaan.online";

export const options = {
  stages: [
    { duration: "20s", target: 5 },
    { duration: "30s", target: 10 },
    { duration: "30s", target: 20 },
    { duration: "20s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    checks: ["rate>0.99"],
    http_req_duration: ["p(95)<500"],
  },
};

export default function () {
  const response = http.get(`${BASE_URL}/api/todos`, {
    tags: { endpoint: "list-todos" },
  });

  const isOk = response.status === 200;

  check(response, {
    "GET todos returns 200": () => isOk,
    "response is a JSON array": (r) => {
      if (!isOk) return false;
      try {
        return Array.isArray(r.json());
      } catch (_) {
        return false;
      }
    },
  });

  if (!isOk) {
    console.error(
      `GET /api/todos failed: status=${response.status}, ` +
        `error=${response.error || "none"}, ` +
        `duration=${response.timings.duration}ms`,
    );
  }
}
