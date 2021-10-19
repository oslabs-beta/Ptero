import { addLog, getLogs, getOneLog } from "../controllers/apiLog.ts";
import { Context } from "https://deno.land/x/oak@v9.0.1/context.ts"


export const logData = async (ctx: any, next: any) => {
  // Time Logger
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  const rt = ctx.response.headers.get("X-Response-Time");

  // logs in the terminal (method - url - response time)
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  
  const ipAddress = ctx.request.ip;
  const method = ctx.request.method;
  const route = ctx.request.url.pathname;
  const status = ctx.response.status;
  const fromCache = ctx.request.fromCache;

  let APIKey;
    if (ctx.request.headers.has('api_key')) APIKey = ctx.request.headers.get('api_key');
    else APIKey = null;

  const data = {
    ipAddress,
    method,
    APIKey,
    route,
    status,
    rt,
    fromCache,
  };

  // add log to the database
  await addLog(data);
};
