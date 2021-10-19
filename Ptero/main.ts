import { Application, Router, RouterContext } from "https://deno.land/x/oak/mod.ts";
import { logData } from "./utils/dataLogging.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { Context } from "https://deno.land/x/oak@v9.0.1/context.ts"
import pteroRouter from "./routers/routers.ts";
import apiLogRouter from "./routers/apiLogRouter.ts";
import userRouter from "./routers/userRouter.ts";

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

// move this under the 'logData' if you want to log the route to '/log'
app.use(apiLogRouter.prefix("/log").routes());
app.use(userRouter.prefix("/users").routes());

// Logging of the methods, routes, and response time
app.use(async (ctx, next) => {
  await logData(ctx, next);
});

// routes to "/api"
app.use(pteroRouter.prefix("/api").routes());

// default methods require to use different routes in Denoo
app.use(router.routes());
app.use(router.allowedMethods());

// global error handling
router.get("/(.*)", async (ctx: any) => {
  ctx.response.status = 404;
  ctx.response.body = "404 | Page not Found";
});

// listening to localhost:PORT
console.log(`Server running on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`);
