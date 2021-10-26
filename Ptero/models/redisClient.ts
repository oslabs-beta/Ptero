import { connect as redisConnect } from "https://deno.land/x/redis/mod.ts";

// connecting to redis server locally
const redisClient = await redisConnect({
  hostname: "127.0.0.1",
  port: 6379,
});

// logs 'PONG' when connected
console.log(await redisClient.ping());

export { redisClient };
