// connect mongo database
// 
import { getLogs, getOneLog, addLog } from '../controllers/apiLog.ts'

export const logData = async (ctx: any) => {
  // console.log(ctx.request)
  const ipAddress = ctx.request.ip;
  const method = ctx.request.method;
  const APIKey = ctx.request.headers.get('api_key');
  const route = ctx.request.url.pathname;
  const status = ctx.response.status;
  const rt = ctx.response.headers.get("X-Response-Time")
  const fromCache = ctx.request.fromCache;
  // console.log("ipAddress:", ipAddress)
  // console.log("method:", method)
  // console.log("APIKey:", APIKey)
  // console.log("Date:", new Date());
  // console.log("route:", route);
  // console.log("response Status:", status)
  // console.log("responseTime:", rt);

  // console.log(ctx.request.headers);
  
  const data = {
    ipAddress,
    method,
    APIKey,
    route,
    status,
    rt,
    fromCache,
  };

  // ctx.request.data = data;

  // console.log(data)
  await addLog(data)
}
