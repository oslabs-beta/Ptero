import { redisClient } from "../models/redisClient.ts";

const expireTime = 30000;    // 86400 seconds = 24 hrs

const redisCheck = async (ctx: any) => {
  const url = ctx.request.url.pathname;
  let cached = await redisClient.get(url);
  console.log("cache is:", await cached, "that thing");
  if (cached) {
    console.log("It's in the cache");
    ctx.response.body = JSON.parse(cached);
    // setting new expiration time when requested again
    await redisClient.expire(`${url}`, expireTime);
    return true;
  } 
  else {
    console.log("It's not in the cache");
    return false;
  }
};

const redisSet = async (ctx: any) => {
  
  if(ctx.response.status === 200) {
    const url = ctx.request.url.pathname;
    const resp = await ctx.response.body;
    const respJSON = await JSON.stringify(resp);
    console.log(resp);
    // define a time to live to avoid flooding the cache;
    await redisClient.set(url, respJSON, { ex: expireTime});
  }
  
   // save user oked ness
  if(ctx.response.status === 202) {
    const key = ctx.request.headers.get('api_key');
    const resp = await ctx.response.body;
    const respJSON = await JSON.stringify(resp);
    console.log(resp);
    // define a time to live to avoid flooding the cache;
    await redisClient.set(key, respJSON, { ex: expireTime});
    ctx.response.status = 200;
  } 
};

export { redisCheck, redisSet };
