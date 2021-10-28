import {
  Users,
  Context
} from '../deps.ts';
// import { Users } from "../models/users.ts";
// import { Context }   from "https://deno.land/x/oak@v9.0.1/context.ts"

// checking if the api key exists in the database
export const checkApiKey = async (ctx: Context) => {
  // check if request header contains API key
  checkIfApiKey(ctx)
  if (ctx.response.status === 401) return;
  let apiKey: any | string = ctx.request.headers.get('api_key');

  const selectedUser: any | undefined = await Users.findOne({ api_key: apiKey }, { noCursorTimeout: false });

  if (selectedUser) {
    ctx.response.status = 202;
    ctx.response.body = {
      success: true,
      data: selectedUser,
    };
  } else {
    ctx.response.status = 401;
    ctx.response.body = {
      success: false,
      msg: "incorrect api key",
    };
  }
};

// checking if user provides an api key
export const checkIfApiKey = async (ctx: Context) => {
  if(ctx.request.headers.has('api_key')) {
    ctx.response.status = 200;
  }
  else {
    ctx.response.body = { msg: "API key is required."}
    ctx.response.status = 401;
  }
};