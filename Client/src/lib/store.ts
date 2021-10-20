import { writable } from "svelte/store";
import {
  avgRspTimeCvsNC,
  reqPerEndpointAndMethodFn,
  RouteHistoryProcess,
  routePerDay,
  totalsPerStatus,
} from "./storeProcessing.ts";

const Logs = writable([]);
const ReqPerEndpointAndMethod = writable([]);
const TotalsStatus = writable([]);
const CachedvsNotCached = writable({});
const DailyData = writable({});
const DayRouteTotal = writable([]);
const RouteHistory = writable([]);

const fetchLogs = async () => {
  let tempLogs = [];
  const url = "http://localhost:9000/log";
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
  RouteHistory,
  TotalsStatus,
};
