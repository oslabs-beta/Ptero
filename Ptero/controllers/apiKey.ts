import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Users } from "../models/users.ts";

export const checkApiKey = async (ctx: any) => {
  console.log("in checkAPIKey");
  // check api key in the cache
  // what happens when user is in the cache ? statuscode?
  // if not check in the db/file

  let apiKey: string = ctx.request.headers.get('api_key');

  const selectedUser: any | undefined = await Users.findOne({ api_key: apiKey }, { noCursorTimeout: false });

  // const oneUser = await Users.findOne({}, { noCursorTimeout: false });

  console.log("this user is", selectedUser);

  console.log("api key is", apiKey); // works

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
