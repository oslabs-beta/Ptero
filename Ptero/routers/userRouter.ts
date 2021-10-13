import { Router } from "https://deno.land/x/oak/mod.ts";
import { getLogs } from "../controllers/apiLog.ts"
import { getUser, getUsers } from "../controllers/users.ts"

const userRouter = new Router();

userRouter.get("/", async (ctx:any, next:any) => {
  console.log("in get all users -----------------")
  await getUsers(ctx)
});
userRouter.get("/:api_key", async (ctx:any, next:any) => {
  console.log("in user individual user -----")
  await getUser(ctx)
});

export default userRouter;