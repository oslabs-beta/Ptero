import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { db, APILog }   from "../models/APILogModel.ts";
// import { ErrorHandler } from "../utils/middlewares.ts";
import { Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";


export const getLogs = async (ctx: any, next: any) => { 
  // const all_users = await users.find({ username: { $ne: null } }).toArray();
  //const users = db.collection<UserSchema>("users");
  try {
    const data: any = await APILog.find({}, { noCursorTimeout: false }).toArray();
    console.log("data:", data)
    ctx.response.body = {
      status: true,
      data: data
    };
    ctx.response.status = 200;
  }
  catch (err) {
    console.log("catch getLog");
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 500;
    console.log(err);
  }
};

export const getOneLog = async (ctx: any, next: any) => {
  try {
    const id = ctx.params.id;
    const data: any = await APILog.findOne({ _id: new Bson.ObjectId(id)}, { noCursorTimeout: false });

    ctx.response.body = {
      status: true,
      data: data,
    }
    ctx.response.status = 200;
    await next();    
  }
  catch(err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 500;
    console.log(err);
  }
}

export const addLog = async (ctx: any) => {
  try {
    // console.log("ctx.request:", ctx.request)
    // console.log("ctx only:", ctx)
    let { method, route, status, APIKey, ipAddress, rt, fromCache } = await ctx;
    // const { method, route, status, APIKey, ipAddress } = await body;
    if (fromCache === undefined) fromCache = false;
    
    await APILog.insertOne({
      method: method,
      route: route,
      timeAccessed: new Date(),
      status: status,
      responseTime: rt,
      APIKey: APIKey, // user id?
      ipAddress: ipAddress,
      fromCache: fromCache,
    });

    // ctx.response.body = {
    //   status: true,
    //   message: 'Added new log data'
    // }
    // ctx.response.status = 201;
  }
  // catch (err) {
  //   ctx.response.body = { status: false, message: 'failed to add new log data' };
  //   ctx.response.status = 500;
  //   console.log(err);
  // }df
  catch(err) {
    console.log(err);
  };
}