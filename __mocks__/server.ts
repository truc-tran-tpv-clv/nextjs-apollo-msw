import { find } from "lodash";
import { SetupServer, setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers) as SetupServer & {
  logs: typeof requestLogs;
};

server.events.on("request:start", async (req) => {
  requestLogs.push({
    path: req.url.pathname,
    query: req.url.search,
    method: req.method,
    body: await req.json(),
    headers: { ...req.headers.raw },
    id: req.id,
  });
});

server.events.on("response:mocked", async (req, reqId) => {
  const item = find(requestLogs.data, { id: reqId });
  if (item && req.body) {
    const temp = JSON.parse(req.body);
    item.response = temp?.data || null;
  }
});

type TRequestLogEntity = {
  id: string;
  headers: Record<string, string>;
  path: string;
  query: string;
  method: string;
  body: {
    operationName: string;
    variables: unknown;
  };
  response?: unknown;
};

const requestLogs = {
  data: [] as TRequestLogEntity[],
  push(req: TRequestLogEntity) {
    this.data.push(req);
  },
  reset() {
    this.data = [];
  },
  getOperation(value: string): TRequestLogEntity[] {
    return this.data.filter((item) => item.body.operationName === value);
  },
};

server.logs = requestLogs;
