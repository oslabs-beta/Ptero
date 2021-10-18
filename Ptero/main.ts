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

// move this under the 'logData' if we want to log the route to '/log'
app.use(apiLogRouter.prefix("/log").routes());
app.use(userRouter.prefix("/users").routes());

// Timing
app.use(async (ctx, next) => {
  await logData(ctx, next);
});

app.use(pteroRouter.prefix("/api").routes());

app.use(router.routes());
app.use(router.allowedMethods());

// global error handling
router.get("/(.*)", async (ctx: any) => {
  ctx.response.status = 404;
  ctx.response.body = "404 | Page not Found";
});

console.log(`Server running on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`);
