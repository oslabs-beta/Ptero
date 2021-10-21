# Welcome to Ptero!

  A middleware framework for Deno native RESTful APIs to add redis caching and log data for later retrieval and use. This README focuses on the mechanics of the Ptero framework and intended for those familiar with JavaScript frameworks as well as a decent understanding of Deno.

  ## Getting Started:

  ### Application, middleware, and context
  ```js
  import { caching, userCaching, logData } from "https://deno.land/x/ptero/mod.ts";
  ```
## Data Logging
Every request to the server will be logged in designated cloud database. Then the web or Electron application of Ptero will retrieve log data from the database and allow visualization of the data with a user-friendly interface. In order to enable data logging, add the following lines of code in your main server file. For more information see [PteroView](../Client/README.md).
  ```js
  // Data Logging
  app.use(async (ctx, next) => {
    await logData(ctx, next);
  });
  ```

## Redis Caching
  In order to power the caching capabilities of Ptero, the use of Redis is required. Redis caching allows acceleration of the data processed in the server. The information requested to the server for the first time will be stored in the Redis Cache with the expiration time (aka **_time-to-live_**). When the same data is requested within the expiration time, the information will be pulled from the cache. This process is potentially faster than the process of retrieving information from the server. The default set-up of our app requires a user to have an API key. If the host decides not to require an API key for the users, simply remove the <code>_checkApiKey_</code> function from the below code. 

### To Set-up Redis:
- Make sure you have Redis installed in your machine.
- To install Redis, check out the [Redis Quick Start Guide](https://redis.io/topics/quickstart).
- Run a Redis instance
  ### Prerequisite
  ```js
  // Example Routing
  const testRouter = new Router();
  ```

  ```js
  // If the server requires an api key
  testRouter.use("/", async (ctx: Context, next: any) => {
    await checkUser(ctx, checkApiKey);
    if (ctx.response.status === 401) return;
    await next();
  });
  ```

  ```js
  // Example Get Method
  testRouter.get("/endpoint", async (ctx: Context, next: any) => {
    await caching(ctx, getController);
  });
  ```

## Testing
  We have build our test suites using a Deno third party module: [SuperOak](https://deno.land/x/superoak@4.4.0). SuperOak was used for testing HTTP in Deno's Oak web framework. Deno also has built-in testing using __*Deno.test*__, which was used in our application to test Redis caching of the server.

## Dependencies
  - [Oak](https://deno.land/x/oak@v9.0.1)
  - [Redis](https://deno.land/x/redis@v0.25.0)


