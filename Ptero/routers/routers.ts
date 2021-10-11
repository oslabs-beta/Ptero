import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addDinosaur,
  deleteDinosaur,
  getDinosaur,
  getDinosaurs,
  updateDinosaur,
} from "../controllers/dinosaurs.ts";

import { checkApiKey, caching, cachingUser } from '../utils/middlewares.ts'
import { delay } from "https://deno.land/std/async/mod.ts";
import { logData } from '../utils/dataLogging.ts'

const pteroRouter = new Router();

pteroRouter.get("/dinosaurs", async(ctx:any, next:any) => {
  await cachingUser(ctx);
  
  if(ctx.response.status === 401) return;

  await caching(ctx, getDinosaurs);
 
});

pteroRouter.get("/dinosaurs/:id", async(ctx:any, next:any) => {
  await cachingUser(ctx);

  if(ctx.response.status === 401) return;

  await caching(ctx, getDinosaur);
});

pteroRouter.post("/dinosaurs", async(ctx:any, next:any) => {
  await cachingUser(ctx);

  if(ctx.response.status === 401) return;

  await addDinosaur;
});
pteroRouter.put("/dinosaurs/:id", async(ctx:any, next:any) => {
  await cachingUser(ctx);

  if(ctx.response.status === 401) return;

  await caching(ctx, updateDinosaur);
});
pteroRouter.delete("/dinosaurs/:id", async(ctx:any, next:any) => {
  await cachingUser(ctx);

  if(ctx.response.status === 401) return;
  
  await deleteDinosaur;
});

export default pteroRouter;
