import { MongoClient, Bson, config } from '../deps.ts';
// import { MongoClient, Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";
// import { config } from "https://deno.land/x/dotenv/mod.ts";
const { DB_HOST_URL, DB_NAME_USER } = config();

const dbHostUrl: any = DB_HOST_URL;
const dbName: any = DB_NAME_USER;    

// connecting to mongoDB listed in .env file
const client = new MongoClient();
await client.connect(dbHostUrl);
const db = client.database(dbName);

interface UserSchema {
  username: string;
  api_key: string;
  date_created: Date; 
  usage: { count: number };
}

const Users = db.collection<UserSchema>("users");

export { db, Users }; 
