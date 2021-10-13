import { connect as redisConnect } from "https://deno.land/x/redis/mod.ts";
import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import { redisSet, redisSetUser } from "../utils/redis.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

// start redis
const redisClient = await redisConnect({
  hostname: "127.0.0.1",
  port: 6379,
});

// start redis

// test if pingging redis gets back pong
Deno.test("Check if redis database is connected", async () => {
  const ping = await redisClient.ping();
  assertEquals(ping, "PONG");
});
// test if can add object to redis
Deno.test("Adds data to the redis cache", async () => {
  const ctx = { request: { url: { pathname: "key1" } }, 
                response: { body: "redis tester" } };
  await redisSet(ctx, 2);
  
  let data = await redisClient.get("key1");

  Deno.test("Data goes in Cache", async () => {
    assertEquals(data, `"${ctx.response.body}"`);
  })
  
  Deno.test("data is delayed and deleted", async () => {
    const delayedPromise = delay(2000);
    const result = await delayedPromise;
    data = await redisClient.get("key1");
    assertEquals(data, {});
  })
});

Deno.test("Adds user to the redis cache", async () => {
  const ctx = { request: { headers: { api_key: "9999" } }, 
                response: { body: "user tester" } };

  await redisSetUser(ctx, 2); 
  
  let data = await redisClient.get("9999");

  Deno.test("Data goes in Cache", async () => {
    assertEquals(data, `"${ctx.response.body}"`);
  })
  
  Deno.test("User is delayed and deleted after time", async () => {
    const delayedPromise = delay(2000);
    const result = await delayedPromise;
    data = await redisClient.get("9999");
    assertEquals(data, {});
  })
});

