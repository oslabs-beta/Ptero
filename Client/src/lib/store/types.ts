interface Logs {
  id: number;
  method: string;
  route: string;
  time: Date;
  status: number;
  respTime: string;
  key: string;
  ip: string;
  cached: boolean;
}

interface LogsResponse {
  _id: { $oid: string },
  method: string,
  route: string,
  timeAccessed: Date,
  status: number,
  responseTime: string,
  APIKey: string,
  ipAddress: string,
  fromCache: boolean,
}

interface CachedvsNotCached {}
interface DailyData {}
interface DayRouteTotal {}
interface Logs {}
interface ReqPerEndpointAndMethod {}
interface ReqPerStatusAndMethod {}
interface RouteHistory {}
interface Settings {}
interface TotalsStatus {}

