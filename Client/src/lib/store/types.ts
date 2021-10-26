interface Logs {
  id: number;
  method: string;
  route: string;
  time: string;
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

interface CachedvsNotCached {
  cached: number,
  notCached: number,
}

interface DailyData {
  [index: string]: {
    date?: string,
    totals: number,
    id?: string,
    [route: string]: any,
  }
}

interface DayRouteTotal {
  date: number,
  route: string,
  total: number,
  id: number,
}


// interface DayRouteTotal extends Array<DailyData> {}

interface interfaceReqPerEndpointAndMethod {
  [index: string]: {
    route: string,
    GET: number,
    POST: number,
    PUT: number,
    DELETE: number,
    id: number,
    tot: number,
  }
}
interface interfaceReqPerStatus {
  [index: string]: {
    status: number,
    GET: number,
    POST: number,
    PUT: number,
    DELETE: number,
    id: number,
    tot: number,
  }
}

interface RouteDaily {
  [route: string]: {
    [strDate: string]: number 
  } 
}

interface TempDate {
  x: number,
  y: number
}

interface TotalsPerStatus {
  [status: string]: number,
}

interface ReqPerStatusAndMethod {}
interface RouteHistory {}
interface Settings {}
interface TotalsStatus {}

export type{
  DayRouteTotal,
  Logs,
  LogsResponse,
  CachedvsNotCached,
  DailyData,
  interfaceReqPerEndpointAndMethod,
  ReqPerStatusAndMethod,
  RouteHistory,
  RouteDaily,
  Settings,
  TempDate,
  TotalsStatus,
  interfaceReqPerStatus,
  TotalsPerStatus,
}