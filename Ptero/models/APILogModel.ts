import { MongoClient, Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const { DB_HOST_URL_LOG, DB_NAME_LOG } = config();

const dbHostUrl: any = DB_HOST_URL_LOG;
const dbName: string = DB_NAME_LOG;

const client = new MongoClient();
await client.connect(dbHostUrl);

const db = client.database(dbName);
//const users = db.collection<UserSchema>("users");

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
  // cached: boolian
}

const APILog = db.collection<LogSchema>("logs")

export { db, APILog }; 


// class DB {
//   public client: MongoClient;
//   constructor(public dbName: string, public url: string) {
//     this.dbName = dbName;
//     this.url = url;
//     this.client = {} as MongoClient;
//   }
//   connect() {
//     const client = new MongoClient();
//     client.connectWithUri(this.url);
//     this.client = client;
//   }
//   get getDatabase() {
//     return this.client.database(this.dbName);
//   }
// }

// const dbName = Deno.env.get("DB_NAME") || "dummyDB";
// const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";
// console.log(dbName, dbHostUrl);
// const db = new DB(dbName, dbHostUrl);
// db.connect();
// export default db;