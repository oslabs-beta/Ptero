import { Router } from "https://deno.land/x/oak/mod.ts";
import { checkApiKey } from "../controllers/controllers.ts"

import {
  getCharacters,
  getOneCharacter,
  addCharacter,
  updateCharacter,
  deleteCharacter,
  getFilms,
  getPlanets,
  getSpecies,
} from "../controllers/controllers.ts";

import { caching, checkUser } from '../../Ptero/deps.ts';

const testRouter = new Router();

testRouter.use("/", async (ctx: any, next: any) => {
  await checkUser(ctx, checkApiKey);
  if(ctx.response.status === 401) return;
  await next();
})

testRouter.get("/characters", async (ctx: any, next: any) => {
  await caching(ctx, getCharacters);
});

testRouter.get("/characters/:id", async (ctx:any, next: any) => {
  await caching(ctx, getOneCharacter);
});

testRouter.post("/characters", async (ctx:any, next: any) => {
  await addCharacter(ctx, next)  
});

testRouter.put("/characters/:id", async (ctx:any, next: any) => {
  await updateCharacter(ctx, next);
});

testRouter.delete("/characters/:id", async (ctx:any, next: any) => {
  await deleteCharacter(ctx, next);
});

testRouter.get("/films", async (ctx: any, next: any) => {
  await caching(ctx, getFilms);
});

testRouter.get("/planets", async (ctx: any, next: any) => {
  await caching(ctx, getPlanets);
});

testRouter.get("/species", async (ctx: any, next: any) => {
  await caching(ctx, getSpecies);
});

export default testRouter;
