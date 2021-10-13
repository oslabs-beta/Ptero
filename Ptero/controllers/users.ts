import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Users } from "../models/users.ts";

export const getUsers = async (ctx: any) => {
  console.log("in get users")
  // check api key in the cache
  // what happens when user is in the cache ? statuscode?
  // if not check in the db/file
  try {
    const data: any = await Users.find({}, { noCursorTimeout: false }).toArray();
    ctx.response.body = {
      status: true,
      data: data
    };
    ctx.response.status = 200;

  }
  catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 404;
    console.log(err);
  }

}
export const getUser = async (ctx: any) => {

  const apiKey = ctx.params.api_key;
  const data: any = await Users.findOne({ api_key: apiKey }, { noCursorTimeout: false })
  try{
    if (data.api_key === apiKey) {
      ctx.response.body = {
        status: true,
        data: data,
      }
      ctx.response.status = 200;
    }
  }
  catch {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 500;
  }

}