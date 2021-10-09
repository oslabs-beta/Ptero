import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import   { db, people, films, species, planets }   from "../models/db.ts";
import { ErrorHandler } from "../utils/middlewares.ts";
import { Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";
// const database = db.getDatabase;
// const collection = database.collection("collection"); // to update with collection

//interface Collection?

export const getCharacters = async (ctx: any, next: any) => { 
  // const all_users = await users.find({ username: { $ne: null } }).toArray();
  //const users = db.collection<UserSchema>("users");
  try {
    const data: any = await people.find({}, { noCursorTimeout: false }).toArray();
    ctx.response.body = {
      status: true,
      data: data
    };
    ctx.response.status = 200;
    await next()
  }
  catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 500;
    console.log(err);
  }
};
// const user1_id = await users.findOne({
// _id: new Bson.ObjectId("SOME OBJECTID STRING"),
// });
export const getOneCharacter = async (ctx: any, next: any) => {
  try {
    const id = ctx.params.id;
    const data: any = await people.findOne({ _id: new Bson.ObjectId(id)}, { noCursorTimeout: false });

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


//   _id: { $oid: string },
//   name: string,
//   mass: string,
//   hair_color: string,
//   skin_color: string,
//   eye_color: string,
//   birth_year: string,
//   gender : string,
//   species: string,
//   homeworld: string,
//   height: number,

export const addCharacter = async (ctx: any, next: any) => {
  try {
    const body = await ctx.request.body();
    const { name, mass, hair_color, skin_color, eye_color, birth_year, gender, species, homeworld, height } = await body.value;

    await people.insertOne({
      name: name, 
      mass: mass, 
      hair_color: hair_color, 
      skin_color: skin_color, 
      eye_color: eye_color, 
      birth_year: birth_year, 
      gender: gender, 
      species: species, 
      homeworld: homeworld, 
      height: height,
    });

    ctx.response.body = {
      status: true,
      message: 'Created new character'
    }
    ctx.response.status = 201;
    await next();
  }
  catch (err) {
    ctx.response.body = { status: false, message: 'failed to create new character' };
    ctx.response.status = 500;
    console.log(err);
  }
}

export const updateCharacter = async ( ctx: any, next: any ) => {
  try {
    const id = ctx.params.id;
    const body = await ctx.request.body();
    const { name } = await body.value;
  
    await people.updateOne( 
      { _id: new Bson.ObjectId(id) },
      { $set: { name: name } },
    );
    
    ctx.response.body = {
      status: true,
      message: 'Updated existing character'
    }
    ctx.response.status = 200;
    await next();
  }
  catch (err) {
    ctx.response.body = { status: false, message: 'failed to create new character' };
    ctx.response.status = 500;
    console.log(err);
  }
}

export const deleteCharacter = async ( ctx: any, next: any ) => {
  try{
    const id = ctx.params.id;
    // const person = people.findOne({ _id : id });

    await people.deleteOne({ _id: new Bson.ObjectId(id) });

    ctx.response.body = {
      status: true,
      message: 'Deleted Charcter Successfully'
    }
    ctx.response.status = 200;
    await next();
  }
  catch (err) {
    ctx.response.body = { 
      status: false, 
      message: 'failed to delete a character' 
    };
    ctx.response.status = 500;
    console.log(err);
  }
}
  //  _id: { $oid: string },
  // title: string,
  // episode_id: number,
  // opening_crawl: string,
  // director: string,
  // producer: string,
  // release_date: Date,
  // __v: number,

export const getFilms = async (ctx: any, next: any) => {
  try {
    const data: any = await films.find({}, { noCursorTimeout: false }).toArray();
    ctx.response.body = {
      status: true,
      data: data
    };
    ctx.response.status = 200;
    await next()
  }
  catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 500;
    console.log(err);
  }
}

export const getPlanets = async (ctx: any, next: any) => {
  try {
    const data: any = await planets.find({}, { noCursorTimeout: false }).toArray();
    ctx.response.body = {
      status: true,
      data: data
    };
    ctx.response.status = 200;
    await next()
  }
  catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 500;
    console.log(err);
  }
}

export const getSpecies = async (ctx: any, next: any) => {
  try {
    const data: any = await species.find({}, { noCursorTimeout: false }).toArray();
    ctx.response.body = {
      status: true,
      data: data
    };
    ctx.response.status = 200;
    await next()
  }
  catch (err) {
    ctx.response.body = { status: false, data: null };
    ctx.response.status = 500;
    console.log(err);
  }
}

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
