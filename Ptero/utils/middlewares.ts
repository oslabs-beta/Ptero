/* Refactoring Tracker

Console.log - done
Bad comments - done
Add Good comments -
Rename functions -
Clean layout - done
*/
import {
  Application,
  isHttpError,
  Status,
} from "https://deno.land/x/oak/mod.ts";

import {
  redisCheck,
  redisCheckUser,
  redisSet,
  redisSetUser,
} from "../utils/redis.ts";
import pteroRouter from "../routers/routers.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Users } from "../models/users.ts";

// caching data in to redis
export const caching = async (ctx: any, func: any) => {
  const method: string = ctx.request.method;
  const reqURL: string = ctx.request.url.pathname;
  let fromCache;

  if (await redisCheck(ctx, func) === true) {
    2;
    console.log("Main await redisCheck === true");
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
  } else {
    await func(ctx);
    if (ctx.response.status === 202) await redisSetUser(ctx, 300);
    else {
      console.log("incorect API key");
    }
  }
};

