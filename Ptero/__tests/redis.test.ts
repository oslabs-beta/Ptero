import {
  assertEquals,
  delay,
  redisConnect,
  redisSet,
  redisSetUser,
} from "../deps.ts";

// start redis connection
const redisClient = await redisConnect({
  hostname: "server_redis_database",
  port: 6379,
});

// test if pingging redis gets back pong
Deno.test("Check if redis database is connected", async () => {
  const ping = await redisClient.ping();
  assertEquals(ping, "PONG");
});

// test if can add object to redis
Deno.test("Adds data to the redis cache", async () => {
  const ctx: any = {
    request: { url: { pathname: "key1" } },
    response: { body: "redis tester" },
  };
  await redisSet(ctx, 2);

  let data = await redisClient.get("key1");

  Deno.test("Data goes in Cache", async () => {
    assertEquals(data, `"${ctx.response.body}"`);
  });

  Deno.test("data is delayed and deleted", async () => {
    const delayedPromise = delay(2000);
    const result = await delayedPromise;
    data = await redisClient.get("key1");
    assertEquals(data, {});
  });
});

Deno.test("Adds user to the redis cache", async () => {
  let newHeaders = new Headers({ api_key: "9999" });
  const ctx = {
    request: { headers: newHeaders },
    response: { body: "user tester" },
  };
  await redisSetUser(ctx, 2);

  let data = await redisClient.get("9999");

  Deno.test("Data goes in Cache", async () => {
    assertEquals(data, `"${ctx.response.body}"`);
  });

  Deno.test("User is delayed and deleted after time", async () => {
    const delayedPromise = delay(2000);
    const result = await delayedPromise;
    data = await redisClient.get("9999");
    assertEquals(data, {});
  });
});
