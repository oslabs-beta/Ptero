import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getCharacters,
  getOneCharacter,
  addCharacter,
  updateCharacter,
  deleteCharacter,
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

});

testRouter.delete("/characters/:id", deleteCharacter);

export default testRouter;
