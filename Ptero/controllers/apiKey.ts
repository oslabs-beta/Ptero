import { Users } from "../models/users.ts";

// checking if the api key exists in the database
export const checkApiKey = async (ctx: any) => {
  // check if request header contains API key
  checkIfApiKey(ctx)
  if (ctx.response.status === 401) return;
  let apiKey: string = ctx.request.headers.get('api_key');

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
export const checkIfApiKey = async (ctx: any) => {
  if(ctx.request.headers.has('api_key')) {
    ctx.response.status = 200;
  }
  else {
    ctx.response.body = { msg: "API key is required."}
    ctx.response.status = 401;
  }
};