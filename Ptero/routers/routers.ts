import { Router } from "https://deno.land/x/oak/mod.ts";
import { addDinosaur, deleteDinosaur, getDinosaur, getDinosaurs, updateDinosaur } from "../controllers/dinosaurs.ts";
import { checkApiKey } from "../controllers/apiKey.ts";
import { caching, checkUser, } from "../utils/middlewares.ts";

const pteroRouter = new Router();

pteroRouter.use("/", async (ctx: any, next: any) => {
  await checkUser(ctx, checkApiKey);
  if (ctx.response.status === 401) return;
  await next();
});

// get all the dinosaurs
pteroRouter.get("/dinosaurs", async (ctx: any, next: any) => {
  await caching(ctx, getDinosaurs);
});

// get one dinosaurs by id
pteroRouter.get("/dinosaurs/:id", async (ctx: any, next: any) => {
  await caching(ctx, getDinosaur);
});

// add a dinosaurs
pteroRouter.post("/dinosaurs", async (ctx: any, next: any) => {
  await addDinosaur;
});

// update existing dinosaur
pteroRouter.put("/dinosaurs/:id", async (ctx: any, next: any) => {
  await caching(ctx, updateDinosaur);
});

// delete existing dinosaur
pteroRouter.delete("/dinosaurs/:id", async (ctx: any, next: any) => {
  await deleteDinosaur;
});

export default pteroRouter;
