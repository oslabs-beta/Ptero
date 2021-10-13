// connect mongo database
//
import { addLog, getLogs, getOneLog } from "../controllers/apiLog.ts";

export const logData = async (ctx: any) => {
  // console.log(ctx.request)
  const ipAddress = ctx.request.ip;
  const method = ctx.request.method;
  let APIKey;
  if (ctx.request.headers.has('api_key')) APIKey = ctx.request.headers.get('api_key');
  else APIKey = null;
  const route = ctx.request.url.pathname;
  const status = ctx.response.status;
  const rt = ctx.response.headers.get("X-Response-Time");
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

  // console.log(data)
  await addLog(data);
};
