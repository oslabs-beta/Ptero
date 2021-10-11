import { MongoClient, Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";

const dbHostUrl = "mongodb+srv://pterots:aZxmaine!302@cluster0.tm2cs.mongodb.net/starwars?authMechanism=SCRAM-SHA-1"
// mongodb+srv://pterots:aZxmaine!302@cluster0.lnd8g.mongodb.net/starwars?authMechanism=SCRAM-SHA-1
// mongodb+srv://pterots:<password>@cluster0.tm2cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const dbName: string = "apilogs";

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