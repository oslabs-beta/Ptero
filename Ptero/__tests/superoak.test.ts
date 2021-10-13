import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { superoak } from "https://x.nest.land/superoak@4.4.0/mod.ts";
import apiLogRouter from "../routers/apiLogRouter.ts"
import { getLogs } from "../controllers/apiLog.ts"

const router = new Router();
router.get("/", (ctx: any) => {
  ctx.response.body = "Hello Deno!";
});

router.get("/ptero", (ctx: any) => {
  ctx.response.body = "Hello Ptero!"
})

router.get("/log", async (ctx: any, next: any) => {
  await getLogs(ctx, next);
})

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

// Send simple GET request
Deno.test("it should support the Oak framework", async () => {
  const request = await superoak(app);
  await request.get("/").expect("Hello Deno!");
});

Deno.test('it should get hello ptero at /ptero', async () => {
  const request = await superoak(app);
  await request.get("/ptero").expect("Hello Ptero!");
})

// to get logs
Deno.test("Log controler should produce json data", async () => {
  const request = await superoak(app);
  await request.get("/log").expect(200).expect("Content-Type", "application/json; charset=utf-8");
}); 
