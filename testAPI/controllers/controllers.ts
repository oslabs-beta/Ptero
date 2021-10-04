import {
  Context,
  HandlerFunc,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import db from "../models/db.ts";
import { ErrorHandler } from "../utils/middlewares.ts";
const database = db.getDatabase;
const collection = database.collection("collection"); // to update with collection
//interface Collection?

//Example of controller
export const createContact: HandlerFunc = async (c: Context) => {
  try {
    if (c.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Invalid body", 422);
    }
    const body = await (c.body());
    if (!Object.keys(body).length) {
      throw new ErrorHandler("Request body can not be empty!", 400);
    }
    const { name, age, email, address } = body;
    const insertedContact = await contacts.insertOne({
      name,
      age,
      email,
      address,
    });
    return c.json(insertedContact, 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

// More complex example (update)
export const updateContact: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };
    if (c.request.headers.get("content-type") !== "application/json") {
      throw new ErrorHandler("Invalid body", 422);
    }
    const body = await (c.body()) as {
      name?: string;
      age?: number;
      email?: string;
      address?: string;
    };
    if (!Object.keys(body).length) {
      throw new ErrorHandler("Request body can not be empty!", 400);
    }
    const getContact = await contacts.findOne({ _id: { "$oid": id } });
    if (getContact) {
      const { matchedCount } = await contacts.updateOne(
        { _id: { "$oid": id } },
        { $set: body },
      );
      if (matchedCount) {
        return c.string("Contact updated successfully!", 204);
      }
      return c.string("Unable to update contact");
    }
    throw new ErrorHandler("Contact not found", 404);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
