/* These functions will allow the users information and data provided in the route to be stored in  
redis cache. Before caching, these functions will check to see if the information already
exists in the cache. If the data is in the cache, information will be pulled from cache and skip the process
of requesting to the route. Retrieving information from the cache will accerate the whole process of acquiring the data.
You will be able to see the response time difference between when data is accessed from the cache and when they is pulled from the actual route. */

import { redisCheck, redisCheckUser, redisSet, redisSetUser, } from "../utils/redis.ts";
import { Context } from "https://deno.land/x/oak@v9.0.1/context.ts";

// storing data in to redis cache
export const caching = async (ctx: any, func: any) => {
  const method: string = ctx.request.method;
  const reqURL: string = ctx.request.url.pathname;

  if (await redisCheck(ctx, func) === true) {
    ctx.request.fromCache = true;
  } else {

    ctx.request.fromCache = false;
    await redisSet(ctx, 300);
  }
};

// checking and caching User information from / into redis 
export const checkUser = async (ctx: Context, func: any) => {
  if (await redisCheckUser(ctx) === true) {
    console.log("Main await redisCheck === true");
  } 
  else {
    await func(ctx);
    if (ctx.response.status === 202) await redisSetUser(ctx, 300);
    else {
      console.log("incorect API key");
    }
  }
};

