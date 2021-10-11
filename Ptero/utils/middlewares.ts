import {
  Application,
  isHttpError,
  Status,
} from "https://deno.land/x/oak/mod.ts";

import { redisCheck, redisSet, redisCheckUser, redisSetUser } from "../utils/redis.ts";
import pteroRouter from "../routers/routers.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Users, UserInterface } from "../models/users.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

// import { delay } from "https://deno.land/std/async/mod.ts";


// const app = new Application();

// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     if (isHttpError(err)) { 
//       switch (err.status) {
//         case Status.NotFound:
//           // handle NotFound
//           break;
//         default:
//           // handle other statuses
//       }
//     } else {
//       // rethrow if you can't handle the error
//       throw err;
//     }
//   }
// });

export const caching = async (ctx: any, func: any) => {
  const method: string = ctx.request.method;
  const reqURL: string = ctx.request.url.pathname;
  console.log("request Method", method);
  console.log("request URL", reqURL);
  if (await redisCheck(ctx, func) === true) {2
    console.log("Main await redisCheck === true");
  }
  else {
    const delayedPromise = delay(100);
    const result = await delayedPromise;
    console.log("Main await redisCheck !== true");
    // await next();
    // app.use(pteroRouter.prefix("/api").routes());
    
    await redisSet(ctx);
  }
};

export const cachingUser = async (ctx: any) => {
  // const method: string = ctx.request.method;
  const reqKey: string = ctx.request.headers.get('api_key');
  // console.log("request Method", method);
  console.log("request Key", reqKey);
  if (await redisCheckUser(ctx) === true) {
    console.log("Main await redisCheck === true");
  }
  else {
    const delayedPromise = delay(100);
    const result = await delayedPromise;
    console.log("Main await redisCheck !== true");
    // await next();
    // app.use(pteroRouter.prefix("/api").routes());
    await checkApiKey(ctx);
    if (ctx.response.status === 202) await redisSetUser(ctx);
    else {
      console.log("incorect API key")
    }
  }
};


export const checkApiKey = async (ctx:any) => {
  console.log("in checkAPIKey")
  // check api key in the cache
  // what happens when user is in the cache ? statuscode?
  // if not check in the db/file
  const selectedUser: UserInterface | undefined = await Users.find((user) =>
    user.api_key === ctx.request.headers.get('api_key')
  );

  console.log("api key is", ctx.request.headers.get('api_key'));
  
  if (selectedUser) { 
    ctx.response.status = 202;
    ctx.response.body = {
      success: true,
      data: selectedUser
    };
  }
  else {
    ctx.response.status = 401;
    ctx.response.body = {
      success: false,
      msg: "incorrect api key"
    }
  }
  
} 