import { MongoClient, Bson } from "https://deno.land/x/mongo@v0.27.0/mod.ts";

const dbHostUrl = "mongodb+srv://pterots:aZxmaine!302@cluster0.tm2cs.mongodb.net/starwars?authMechanism=SCRAM-SHA-1"
// mongodb+srv://pterots:aZxmaine!302@cluster0.lnd8g.mongodb.net/starwars?authMechanism=SCRAM-SHA-1
// mongodb+srv://pterots:<password>@cluster0.tm2cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const dbName: string = "starwars";

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
  height: number,
}

interface FilmSchema {
  _id: { $oid: string },
  title: string,
  episode_id: number,
  opening_crawl: string,
  director: string,
  producer: string,
  release_date: Date,
  __v: number,
}

interface PlanetSchema {
  _id: { $oid: string},
  name: string,
  rotation_period: number,
  orbital_period: number,
  diameter: number,
  climate: string,
  gravity: string,
  terrain: string,
  surface_water: string,
  population: number,
  __v: number,
}

interface SpeciesSchema {
  _id: { $oid: string},
  name: string,
  classification: string,
  average_height: string,
  average_lifesppan: string,
  hair_colors: string,
  skin_colors: string,
  language: string,
  homeworld: string,
  homeworld_id: {$oid: string},
}

const db = client.database(dbName);
//const users = db.collection<UserSchema>("users");
const people = db.collection<CharacterSchema>("people");
const films = db.collection<FilmSchema>("films")
const planets = db.collection<PlanetSchema>("planets");
const species = db.collection<SpeciesSchema>("species")

export { db, people, films, planets, species }; 