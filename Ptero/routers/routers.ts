import {
  Router, checkApiKey, caching, checkUser, Context
} from '../deps.ts';

const pteroRouter = new Router();

pteroRouter.use("/", async (ctx: Context, next: any) => {
  await checkUser(ctx, checkApiKey);
  if (ctx.response.status === 401) return;
  await next();
});

export default pteroRouter;
