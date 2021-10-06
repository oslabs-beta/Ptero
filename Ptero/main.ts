import {
  Application,
  Router,
  RouterContext,
  send,
} from "https://deno.land/x/oak/mod.ts";
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

console.log(`Server running on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`);
