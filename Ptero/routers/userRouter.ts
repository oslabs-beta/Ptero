import {
  Router,
  getLogs,
  getUser,
  getUsers,
  Context
} from '../deps.ts'

const userRouter = new Router();

// retrieving all users
userRouter.get("/", async (ctx:Context, next:any) => {
  await getUsers(ctx)
});

// retrieve one user by api key
userRouter.get("/:api_key", async (ctx:Context, next:any) => {
  await getUser(ctx)
});

export default userRouter;