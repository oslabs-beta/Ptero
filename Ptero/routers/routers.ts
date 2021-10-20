import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addDinosaur,
  deleteDinosaur,
  getDinosaur,
  getDinosaurs,
  updateDinosaur,
} from "../controllers/dinosaurs.ts";
import { checkApiKey } from "../controllers/apiKey.ts";
import { caching, checkUser, } from "../utils/middlewares.ts";

const pteroRouter = new Router();

pteroRouter.use("/", async (ctx: any, next: any) => {
  // await checkIfApiKey(ctx, next);
  // if(ctx.response.status === 401) return;
  await checkUser(ctx, checkApiKey);
  if (ctx.response.status === 401) return;
  await next();
});

pteroRouter.get("/dinosaurs", async (ctx: any, next: any) => {
  await caching(ctx, getDinosaurs);
});

pteroRouter.get("/dinosaurs/:id", async (ctx: any, next: any) => {
  await caching(ctx, getDinosaur);
});

pteroRouter.post("/dinosaurs", async (ctx: any, next: any) => {
  await addDinosaur;
});
pteroRouter.put("/dinosaurs/:id", async (ctx: any, next: any) => {
  await caching(ctx, updateDinosaur);
});
pteroRouter.delete("/dinosaurs/:id", async (ctx: any, next: any) => {
  await deleteDinosaur;
});

export default pteroRouter;
