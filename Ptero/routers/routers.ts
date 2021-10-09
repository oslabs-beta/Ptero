import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  addDinosaur,
  deleteDinosaur,
  getDinosaur,
  getDinosaurs,
  updateDinosaur,
} from "../controllers/dinosaurs.ts";

import { checkApiKey, caching } from '../utils/middlewares.ts'

const pteroRouter = new Router();

pteroRouter.get("/dinosaurs", async(ctx:any, next:any) => {
  await checkApiKey(ctx);
  if(ctx.response.status !== 202) return; 
  await caching(ctx)
  if(ctx.response.status !== 200) return; 
  await getDinosaurs(ctx);
  await caching(ctx)
});

pteroRouter.get("/dinosaurs/:id", getDinosaur);
pteroRouter.post("/dinosaurs", addDinosaur);
pteroRouter.put("/dinosaurs/:id", updateDinosaur);
pteroRouter.delete("/dinosaurs/:id", deleteDinosaur);

export default pteroRouter;
