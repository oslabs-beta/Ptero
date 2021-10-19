import { Router } from "https://deno.land/x/oak/mod.ts";
import { getLogs, getOneLog } from "../controllers/apiLog.ts"
import { Context } from "https://deno.land/x/oak@v9.0.1/context.ts"

const apiLogRouter = new Router();

apiLogRouter.get("/", async (ctx:Context, next:any) => {
  await getLogs(ctx, next)
});

apiLogRouter.get("/:id", async (ctx:Context, next:any) => {
  await getOneLog(ctx, next)
});

export default apiLogRouter;