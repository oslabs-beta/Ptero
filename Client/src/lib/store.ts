import { get, writable } from "svelte/store";
import {
  avgRspTimeCvsNC,
  reqPerEndpointAndMethodFn,
  reqPerStatusAndMethodProcess,
  RouteHistoryProcess,
  routePerDay,
  totalsPerStatus,
} from "./storeProcessing.ts";

//Bulk of logs from the server
const Logs = writable([]);

//Processed logs for the graphs
const ReqPerEndpointAndMethod = writable([]);
const ReqPerStatusAndMethod = writable([]);
const TotalsStatus = writable([]);
const CachedvsNotCached = writable({});
const DailyData = writable({});
const DayRouteTotal = writable([]);
const RouteHistory = writable([]);

//Settings related store
const Settings = writable({
  serverAddress: "http://localhost:9000/log",
  refreshRate: "10",
  svelteAPIKey: "pwdawdjioawjdioq131",
  redisTTL: "100",
});

//Function to retrieve the logs from the server
const fetchLogs = async () => {
  let tempLogs = [];
  const url = get(Settings).serverAddress;
  const res = await fetch(url);
  const data = await res.json();
  const loadedLogs = data.data.map((data, index: number) => {
    return {
      id: index + 1,
      time: data.timeAccessed,
      method: data.method,
      route: data.route,
      status: data.status,
      respTime: data.responseTime,
      key: data.APIKey,
      ip: data.ipAddress,
      cached: data.fromCache,
    };
  });
  tempLogs = await loadedLogs;
  await Logs.set(tempLogs.reverse());

  totalsPerStatus(tempLogs, TotalsStatus);
  routePerDay(tempLogs, DailyData, DayRouteTotal);
  reqPerEndpointAndMethodFn(tempLogs, ReqPerEndpointAndMethod);
  reqPerStatusAndMethodProcess(
    tempLogs,
    ReqPerStatusAndMethod,
  );
  avgRspTimeCvsNC(tempLogs, CachedvsNotCached);
  RouteHistoryProcess(tempLogs, RouteHistory);
};

fetchLogs();

export {
  CachedvsNotCached,
  DailyData,
  DayRouteTotal,
  Logs,
  ReqPerEndpointAndMethod,
  ReqPerStatusAndMethod,
  RouteHistory,
  Settings,
  TotalsStatus,
};
