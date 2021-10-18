import { Router } from "https://deno.land/x/oak/mod.ts";
import { getLogs } from "../controllers/apiLog.ts"
import { getUser, getUsers } from "../controllers/users.ts"

const userRouter = new Router();

userRouter.get("/", async (ctx:any, next:any) => {
  await getUsers(ctx)
});
userRouter.get("/:api_key", async (ctx:any, next:any) => {
  await getUser(ctx)
});

export default userRouter;