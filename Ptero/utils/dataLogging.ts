/* 
Keeping track of the users and what information has been accessed is important in managing the RESTful API.
These functinos will allow the API host to visualize all the requests in the server by storing the data into their cloud MongoDB.
If additional information is desired from these logs, simply add variables that you want to monitor and retrieve the appropriate
information from the request and response. 
*/

import { addLog } from "../deps.ts";

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

  // if api key is provided, it is retrieved from the request header, if not api key is equal to null.
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
