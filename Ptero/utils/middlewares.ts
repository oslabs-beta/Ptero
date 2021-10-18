import { redisCheck, redisCheckUser, redisSet, redisSetUser, } from "../utils/redis.ts";

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
export const checkUser = async (ctx: any, func: any) => {
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

