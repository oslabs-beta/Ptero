import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import   { db, people }   from "../models/db.ts";
import { ErrorHandler } from "../utils/middlewares.ts";
// const database = db.getDatabase;
// const collection = database.collection("collection"); // to update with collection

//interface Collection?

export const getCharacters = async (ctx: any, next: any) => { 
  console.log("in controller getpeople")
  // const all_users = await users.find({ username: { $ne: null } }).toArray();
  //const users = db.collection<UserSchema>("users");
  try {
    const data: any = await people.find({}, { noCursorTimeout: false }).toArray();
    ctx.response.body = {
      status: true,
      data: data
    };

    console.log("data is", data);
    ctx.response.status = 200;
    await next()
  }
  catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 500;
    console.log(err);
  }
};

//from tutorial
// const peopleCollection = db.collection('people');

// export const getpeople = async (ctx: RouterContext) => {
//   console.log('in the tutorial get people controller')
//   const people = await peopleCollection.find();
//   ctx.response.body = people;
// }


// export const getCharacter = async ({ params, response }: { params: { name: string }; response: any }) => {
  
// }

export const addCharacter = (ctx: any) => {
  try {
  }
  catch(err){

  }
}

// export const updateCharacter = ({ response }: { response: any}) => {
  
// }

// export const deleteCharacter = ({ response }: { response: any}) => {
  
// }


// //Example of controller
// export const createContact: HandlerFunc = async (c: Context) => {
//   try {
//     if (c.request.headers.get("content-type") !== "application/json") {
//       throw new ErrorHandler("Invalid body", 422);
//     }
//     const body = await (c.body());
//     if (!Object.keys(body).length) {
//       throw new ErrorHandler("Request body can not be empty!", 400);
//     }
//     const { name, age, email, address } = body;
//     const insertedContact = await contacts.insertOne({
//       name,
//       age,
//       email,
//       address,
//     });
//     return c.json(insertedContact, 201);
//   } catch (error) {
//     throw new ErrorHandler(error.message, error.status || 500);
//   }
// };

// // More complex example (update)
// export const updateContact: HandlerFunc = async (c: Context) => {
//   try {
//     const { id } = c.params as { id: string };
//     if (c.request.headers.get("content-type") !== "application/json") {
//       throw new ErrorHandler("Invalid body", 422);
//     }
//     const body = await (c.body()) as {
//       name?: string;
//       age?: number;
//       email?: string;
//       address?: string;
//     };
//     if (!Object.keys(body).length) {
//       throw new ErrorHandler("Request body can not be empty!", 400);
//     }
//     const getContact = await contacts.findOne({ _id: { "$oid": id } });
//     if (getContact) {
//       const { matchedCount } = await contacts.updateOne(
//         { _id: { "$oid": id } },
//         { $set: body },
//       );
//       if (matchedCount) {
//         return c.string("Contact updated successfully!", 204);
//       }
//       return c.string("Unable to update contact");
//     }
//     throw new ErrorHandler("Contact not found", 404);
//   } catch (error) {
//     throw new ErrorHandler(error.message, error.status || 500);
//   }
// };
