import { redisClient } from "../models/redisClient.ts";
import { Context } from "https://deno.land/x/oak@v9.0.1/context.ts"

/* This is constant variable that determines the expiration time of the data stored in cache (time-to-live).
Redis takes time-to-live in seconds, hence time-to-live of 300 will be equivalent to 5 mintues.
    ex) 86400 seconds = 24 hours, 43200 seconds = 12 hours, 3600 seconds = 1 hour, etc..
When the route that already exists in the cache is requested, the expiration time will be renewed. 
*/

const expireTime = 300; 

// check if data is in the redis cache
const redisCheck = async (ctx: Context, func: any) => {
  const url = ctx.request.url.pathname;
  let cached = await redisClient.get(url);

  if (cached) {
    ctx.response.body = JSON.parse(cached);

    // setting new expiration time when requested again
    await redisClient.expire(`${url}`, expireTime);
    return true;
  } 
  else {
    await func(ctx);
    return false;
  }
};

// check if user exists in the redis cache
const redisCheckUser = async (ctx: any) => {
  let key: string;
  if (ctx.request.headers.has('api_key')) key = ctx.request.headers.get('api_key');
  else key = "";

  let cached = await redisClient.get(key);
  if (cached) {
    ctx.response.body = JSON.parse(cached);

    // setting new expiration time when requested again if same data exists
    await redisClient.expire(`${key}`, expireTime);
    return true;
  } 
  else {
    return false;
  }
};

// storing requested data in the cache with expiration time
const redisSet = async (ctx: Context, time: number) => {
  const url = ctx.request.url.pathname;
  const resp = await ctx.response.body;
  const respJSON = await JSON.stringify(resp);

  // set time-to-live for the data stored in cache
  await redisClient.set(url, respJSON, { ex: time });
};

// storing requested user data in the cache with expiration time
// expiration time is provided upon invoking this function and does not depend on the global constant variable provided in the top of this file.
const redisSetUser = async (ctx: any, time: number) => {
  let key: string;
  if (ctx.request.headers.has('api_key')) key = ctx.request.headers.get('api_key');
  else key = "";
 
  const resp = await ctx.response.body;
  const respJSON = await JSON.stringify(resp);

  // set time-to-live for the user stored in cache
  await redisClient.set(key, respJSON, { ex: time });
  ctx.response.status = 200;
};

export { redisCheck, redisCheckUser, redisSet, redisSetUser };
