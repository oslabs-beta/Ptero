import { Router } from "https://deno.land/x/oak/mod.ts";
import { getLogs } from "../controllers/apiLog.ts"

const apiLogRouter = new Router();

apiLogRouter.get("/", async (ctx:any, next:any) => {
  await getLogs(ctx, next)
});

export default apiLogRouter;