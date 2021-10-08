import { redisClient } from "../models/redisClient.ts";

const redisCheck = async (ctx: any, next: any) => {
  const url = ctx.request.url.pathname;
  let cached = await redisClient.get(url);
  console.log("cache is:", await cached, "that thing");
  if (cached) {
    console.log("It's in the cache");
    ctx.response = JSON.parse(cached);
    return true;
  } else {
    console.log("It's not in the cache");
    return false;
  }
};

const redisSet = async (ctx: any, next: any) => {
  const url = ctx.request.url.pathname;
  const resp = await ctx.response;
  const respJSON = await JSON.stringify(resp);
  console.log(resp);
  await redisClient.set(`${url}`, respJSON);
};

export { redisCheck, redisSet };
