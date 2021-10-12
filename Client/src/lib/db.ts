// import mongoose from "mongoose";

// const URI =
//   "mongodb+srv://pterots:aZxmaine!302@cluster0.tm2cs.mongodb.net/PteroDB?retryWrites=true&w=majority";

// const logSchema = new mongoose.Schema({
//   method: String,
//   route: String,
//   timeAccessed: Date,
//   status: String,
//   responseTime: String,
//   APIKey: String, // user id?
//   ipAddress: String,
//   fromCache: Boolean,
//   // cached: boolian
// });

// const Log = mongoose.model("Log", logSchema, "Logs");

// mongoose.connect(
//   URI,
//   { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
//   function (error: Error) {
//     if (error) console.log("Error:" + error);
//   },
// );

// export default { Log };
