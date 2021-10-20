import { MongoClient, Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const { DB_HOST_URL_LOG, DB_NAME_LOG } = config()

const dbHostUrl: any = DB_HOST_URL_LOG;
const dbName: any = DB_NAME_LOG;  


const client = new MongoClient();

await client.connect(dbHostUrl);
const db = client.database(dbName);

// method, route, time accessed at, response status, response time, userid, ip address
interface LogSchema {
  _id: { $oid: string },
  method: string,
  route: string,
  timeAccessed: Date,
  status: string,
  responseTime: string,
  APIKey: string, // user id?
  ipAddress: string,
  fromCache: boolean,
}

const APILog = db.collection<LogSchema>("logs")

export { db, APILog }; 