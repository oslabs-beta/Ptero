import { MongoClient, Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const { DB_HOST_URL_LOG, DB_NAME_LOG } = config()

// host url and database name is pulled from .env file
const dbHostUrl: any = DB_HOST_URL_LOG;
const dbName: any = DB_NAME_LOG;  

// connecting to the mongoDB 
const client = new MongoClient();
await client.connect(dbHostUrl);
const db = client.database(dbName);

// Log schema
interface LogSchema {
  _id: { $oid: string },
  method: string,
  route: string,
  timeAccessed: Date,
  status: string,
  responseTime: string,
  APIKey: string,
  ipAddress: string,
  fromCache: boolean,
}

const APILog = db.collection<LogSchema>("logs")

export { APILog }; 