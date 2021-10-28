import {
  getLogs,
  Router,
  Context,
  getOneLog
} from '../deps.ts';

const apiLogRouter = new Router();

// retrieving all the logs
apiLogRouter.get("/", async (ctx:Context, next:any) => {
  await getLogs(ctx, next)
});

// retrieve one of the logs by id
apiLogRouter.get("/:id", async (ctx:Context, next:any) => {
  await getOneLog(ctx, next)
});

export default apiLogRouter;