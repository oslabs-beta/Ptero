import { Users } from "../models/users.ts";
import { Context }   from "https://deno.land/x/oak@v9.0.1/context.ts"

// get all the users
export const getUsers = async (ctx: Context) => {
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
};

// get one user by api key
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
};