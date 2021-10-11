import { Router } from "https://deno.land/x/oak/mod.ts";

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

const testRouter = new Router();

testRouter.get("/", ctx => {
  ctx.response.body = "hello ptero";
})

testRouter.get("/characters", async (ctx: any, next: any) => {
  await getCharacters(ctx, next);
});

testRouter.get("/characters/:id", async (ctx:any, next: any) => {
  await getOneCharacter(ctx, next);
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
  await getFilms(ctx, next)
});

testRouter.get("/planets", async (ctx: any, next: any) => {
  await getPlanets(ctx, next)
});

testRouter.get("/species", async (ctx: any, next: any) => {
  await getSpecies(ctx, next)
});

export default testRouter;
