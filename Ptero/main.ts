import {
  Application,
  Router,
  RouterContext,
  send,
} from "https://deno.land/x/oak/mod.ts";
import { redisCheck, redisSet } from "./utils/redis.ts";
import pteroRouter from "./routers/routers.ts";

const env = Deno.env.toObject();
const PORT = env.PORT || 9000;
const HOST = env.HOST || "localhost";

const app = new Application();
const router = new Router();

// Logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// caching

app.use(async (ctx, next) => {
  const method: string = ctx.request.method;
  const reqURL: string = ctx.request.url.pathname;
  console.log("request Method", method);
  console.log("request URL", reqURL);
  if (await redisCheck(ctx, next) === true) {
    console.log("Main await redisCheck === true");
  }
  else {
    console.log("Main await redisCheck !== true");
    await next();
    app.use(pteroRouter.prefix("/api").routes());
    await redisSet(ctx, next);
  }
});

app.use(pteroRouter.prefix("/api").routes());

// global error handling
router.get("/(.*)", async (ctx: any) => {      
  ctx.response.status = 404;
  ctx.response.body = "404 | Page not Found";
});


//Serve
// app.use(async (context) => {
//   await send(context, context.request.url.pathname, {
//     root: `${Deno.cwd()}/Client/public`,
//     index: "index.html",
//   });
// });

// global error handler


app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server running on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`);
