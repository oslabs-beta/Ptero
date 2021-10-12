import { Router } from "https://deno.land/x/oak/mod.ts";
import { getAllApiLogs } from 
const apiLogRouter = new Router();

apiLogRouter.use("/", async(ctx:any, next:any) => {
  await getAllApiLogs(ctx)
});

export default apiLogRouter;