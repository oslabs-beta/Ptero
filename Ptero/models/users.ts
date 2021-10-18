import { MongoClient, Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const { DB_HOST_URL, DB_NAME_USER } = config();

const dbHostUrl = DB_HOST_URL;
const dbName: string = DB_NAME_USER;

const client = new MongoClient();
await client.connect(dbHostUrl);

interface UserSchema {
  username: string;
  api_key: string;
  date_created: Date; 
  usage: { count: number };
}

const db = client.database(dbName);
const Users = db.collection<UserSchema>("users");

export { db, Users }; 