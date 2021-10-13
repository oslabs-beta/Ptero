import {
  Application,
  Router,
  RouterContext,
  send,
} from "https://deno.land/x/oak/mod.ts";
import { redisCheck, redisSet } from "./utils/redis.ts";
import pteroRouter from "./routers/routers.ts";
import apiLogRouter from "./routers/apiLogRouter.ts";
import userRouter from "./routers/userRouter.ts";
// import { delay } from "https://deno.land/std/async/mod.ts";
import { logData } from "./utils/dataLogging.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 9000;
const HOST = env.HOST || "localhost";

const app = new Application();
const router = new Router();

app.use(
  oakCors({
    origin: "http://localhost:3000",
  }),
);

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  // console.log(ctx)
  await logData(ctx);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// caching
// app.use(async (ctx, next) => {
//   const method: string = ctx.request.method;
//   const reqURL: string = ctx.request.url.pathname;
//   console.log("request Method", method);
//   console.log("request URL", reqURL);
//   if (await redisCheck(ctx, next) === true) {
//     console.log("Main await redisCheck === true");
//   }
//   else {
//     console.log("Main await redisCheck !== true");
//     await next();
//     // app.use(pteroRouter.prefix("/api").routes());
//     await redisSet(ctx, next);
//   }
// });

// api keys
// const genKey = () => {
//   return [...Array(30)]
//     .map((e) => ((Math.random() * 36) | 0).toString(36)).join('');
// }

// const createUser = (username, req) => {
//   const today = new Date().toISOString().split('T')[0];
//   const user = {
//     _id: Date.now(),
//     api_key: genKey(),
//     username: username,
//     host: req.headers.origin,
//     usage: [{ date: today, count: 0}],
//   }
// }
// when user registers generate an api key using some hashing algorithm
// save api key with username and usage: { count: 0, date: date(now) } in db;
// request endpoint starts at localhost:xxxx/

// const delayedPromise = delay(2000);
// const result = await delayedPromise;
app.use(apiLogRouter.prefix("/log").routes());
app.use(userRouter.prefix("/users").routes());

app.use(pteroRouter.prefix("/api").routes());

//Serve
// app.use(async (context) => {
//   await send(context, context.request.url.pathname, {
//     root: `${Deno.cwd()}/Client/public`,
//     index: "index.html",
//   });
// });

app.use(router.routes());
app.use(router.allowedMethods());

// global error handling
router.get("/(.*)", async (ctx: any) => {
  ctx.response.status = 404;
  ctx.response.body = "404 | Page not Found";
});

console.log(`Server running on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`);
