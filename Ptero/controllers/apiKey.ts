import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Users, UserInterface } from "../models/users.ts";


// export const checkApiKey = async (ctx:any) => {
//   console.log("in checkAPIKey")
//   const selectedUser: UserInterface | undefined = await Users.find((user) =>
//     user.api_key === ctx.request.headers.get('api_key')
//   );

//   console.log("api key is", ctx.request.headers.get('api_key'));
  
//   if (selectedUser) { 
//     ctx.response.status = 200;
//     ctx.response.body = {
//       success: true,
//       data: selectedUser
//     };
//   }
//   else {
//     ctx.response.status = 401;
//   }
// } 
  // check if given api matches one in database

  // const { apiKey }  = ctx.params;
  // const user: any = Users.findOne({ api_key: apiKey }, { noCursorTimeout: false });
  // 'kind of set the user to be that user for further data gathering


  // log ip adress
