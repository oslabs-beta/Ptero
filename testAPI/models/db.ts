import { MongoClient, Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";

const dbHostUrl = "mongodb+srv://pterots:aZxmaine!302@cluster0.lnd8g.mongodb.net/starwars?authMechanism=SCRAM-SHA-1"
// mongodb+srv://pterots:aZxmaine!302@cluster0.lnd8g.mongodb.net/starwars?authMechanism=SCRAM-SHA-1
// mongodb+srv://pterots:<password>@cluster0.tm2cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const dbName: string = "starwars";

// const client = new MongoClient({
//   db: dbName,
//   tls: true,
//   servers: [
//     {
//       hosts: "cluster0.lnd8g.mongodb.net",
//       port: 5000,
//     },
//   ],
//   credential: {
//     username: "pterots",
//     password: "aZxmaine!302",
//     db: "starwars",
//     mechanism: "majority"
//   },
// });

const client = new MongoClient();
await client.connect(dbHostUrl);

interface CharacterSchema {
 _id: { $oid: string },
  name: string,
  mass: string,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender : string,
  species: string,
  homeworld: string,
  height: number
}

const db = client.database(dbName);
//const users = db.collection<UserSchema>("users");
const people = db.collection<CharacterSchema>("people");

export { db, people } ; 