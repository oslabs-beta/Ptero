import { redisConnect } from "../deps.ts";

// connecting to redis server locally
const redisClient = await redisConnect({
  hostname: "127.0.0.1",
  // hostname: "server_redis_database",
  port: 6379,
});

// logs 'PONG' when connected
console.log(await redisClient.ping());

export { redisClient };
