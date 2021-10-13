import { MongoClient, Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";

const dbHostUrl = "mongodb+srv://pterots:aZxmaine!302@cluster0.tm2cs.mongodb.net/TestDB?authMechanism=SCRAM-SHA-1"
// mongodb+srv://pterots:aZxmaine!302@cluster0.lnd8g.mongodb.net/starwars?authMechanism=SCRAM-SHA-1
// mongodb+srv://pterots:<password>@cluster0.tm2cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const dbName: string = "TestDB";

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