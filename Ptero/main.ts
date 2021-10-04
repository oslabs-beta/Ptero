import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
//import router

import { ErrorMiddleware } from "./utils/middlewares.ts";

const app = new Application();
//route anything OK to router

//route 404 to 404 not found

console.log(`server listening on http://localhost:5000`);

//TO READ:
//https://deno.land/manual@v1.14.2/examples/http_server
