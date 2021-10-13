import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Users } from "../models/users.ts";

export const checkApiKey = async (ctx:any) => {
  console.log("in checkAPIKey")
  // check api key in the cache
  // what happens when user is in the cache ? statuscode?
  // if not check in the db/file
  const selectedUser: any | undefined = await Users.find((user: any) => {
    user.api_key === ctx.request.headers.get('api_key')}, { noCursorTimeout: false }
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