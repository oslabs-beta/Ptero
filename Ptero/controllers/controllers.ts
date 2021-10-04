import {
  Context,
  HandlerFunc,
} from "https://deno.land/x/abc@v1.3.3/mod.ts";
import db from "../models/db.ts";
import { ErrorHandler } from "../utils/middlewares.ts";
const database = db.getDatabase;
const collection = database.collection("collection"); // to update with collection
//interface Collection?
