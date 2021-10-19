import { Router } from "https://deno.land/x/oak/mod.ts";
import { getLogs } from "../controllers/apiLog.ts"
import { getUser, getUsers } from "../controllers/users.ts"
import { Context } from "https://deno.land/x/oak@v9.0.1/context.ts"

const userRouter = new Router();

userRouter.get("/", async (ctx:Context, next:any) => {
  await getUsers(ctx)
});
userRouter.get("/:api_key", async (ctx:Context, next:any) => {
  await getUser(ctx)
});

export default userRouter;