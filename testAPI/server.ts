import {
  Application,
  Router,
  RouterContext,
  send,
} from "https://deno.land/x/oak/mod.ts";


import testRouter from "./routers/routers.ts";

import { logData } from '../Ptero/utils/dataLogging.ts'


const env = Deno.env.toObject();
const PORT = env.PORT || 5000;
const HOST = env.HOST || "localhost";

const app = new Application();
const router = new Router();

// Logger
// app.use(async (ctx, next) => {
//   await next();
//   const rt = ctx.response.headers.get("X-Response-Time");
//   console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
//   await logData(ctx)
// });

// sudo service redis-server start
// redis-cli
// denon run --allow-all --unstable 

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  await logData(ctx)
});

// app.use(async (context) => {
//   await send(context, context.request.url.pathname, {
//     root: `${Deno.cwd()}/Client/public`,
//     index: "index.html",
//   });
// });

app.use(testRouter.prefix("/test").routes());

app.use(router.routes());
app.use(router.allowedMethods());

// global error handling
router.get("/(.*)", async (ctx: any) => {      
  ctx.response.status = 404;
  ctx.response.body = "404 | Page not Found";
});

console.log(`Server running on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`);