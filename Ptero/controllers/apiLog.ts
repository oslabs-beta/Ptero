import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { APILog } from "../models/APILogModel.ts";
import { Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";
import { Context } from "https://deno.land/x/oak@v9.0.1/context.ts"

// retrieve all the logs from the database
export const getLogs = async (ctx: Context, next: any) => {
  try {
    const data: any = await APILog.find({}, { noCursorTimeout: false }).toArray();
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

// get one log by id
export const getOneLog = async (ctx: any, next: any) => {
  try {
    const id = ctx.params.id;
    const data: any = await APILog.findOne({ _id: new Bson.ObjectId(id) }, { noCursorTimeout: false });

    ctx.response.body = {
      status: true,
      data: data,
    }
    ctx.response.status = 200;

  }
  catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 500;
    console.log(err);
  }
};

// add new log to database
export const addLog = async (ctx: any) => {
  try {
    let { method, route, status, APIKey, ipAddress, rt, fromCache } = await ctx;
    if (fromCache === undefined) fromCache = false;

    await APILog.insertOne({
      method: method,
      route: route,
      timeAccessed: new Date(),
      status: status,
      responseTime: rt,
      APIKey: APIKey,
      ipAddress: ipAddress,
      fromCache: fromCache,
    });
  }
  catch (err) {
    console.log(err);
  };
};