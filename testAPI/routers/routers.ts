import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getCharacters,
  addCharacter,
} from "../controllers/controllers.ts";

const testRouter = new Router();

testRouter.get("/", ctx => {
  ctx.response.body = "hello ptero";
})

testRouter.get("/characters", async(ctx: any, next: any) => {
  console.log("we are in getCharacter route")
  await getCharacters(ctx, next);
  console.log("after getCharacters");
});
// testRouter.get("/characters/:id", getCharacter);
testRouter.post("/characters", addCharacter);
// testRouter.put("/characters/:id", updateCharacter);
// testRouter.delete("/characters/:id", deleteCharacter);

export default testRouter;
