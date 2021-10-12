import { redisClient } from "../models/redisClient.ts";
import {
  getDinosaurs,
} from "../controllers/dinosaurs.ts";

import { checkApiKey, caching, cachingUser } from '../utils/middlewares.ts'
import { delay } from "https://deno.land/std/async/mod.ts";

const expireTime = 300;    // 86400 seconds = 24 hrs

const redisCheck = async (ctx: any, func: any) => {
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
    await func(ctx);
    return false;
  }
};

const redisCheckUser = async (ctx: any) => {
  // const url = ctx.request.url.pathname;
  const key = ctx.request.headers.get('api_key');
  console.log(ctx.request.headers);
  let cached = await redisClient.get(key);
  console.log("cache is:", await cached, "that key");
  if (cached) {
    console.log("Key is in the cache");
    ctx.response.body = JSON.parse(cached);
    // setting new expiration time when requested again
    await redisClient.expire(`${key}`, expireTime);
    return true;
  }
  else {
    console.log("Key is not in the cache");
    return false;
  }
};


const redisSet = async (ctx: any) => {
  const url = ctx.request.url.pathname;
  const resp = await ctx.response.body;
  const respJSON = await JSON.stringify(resp);
  console.log(resp);
  // define a time to live to avoid flooding the cache;
  await redisClient.set(url, respJSON, { ex: expireTime });
};

const redisSetUser = async (ctx: any) => {
  // save user oked ness
  const key = ctx.request.headers.get('api_key');
  const resp = await ctx.response.body;
  const respJSON = await JSON.stringify(resp);
  console.log(resp);
  // define a time to live to avoid flooding the cache;
  await redisClient.set(key, respJSON, { ex: expireTime });
  ctx.response.status = 200;

}


export { redisCheck, redisSet, redisCheckUser, redisSetUser };
