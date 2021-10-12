import mongoose from "mongoose";

const uri =
  "mongodb+srv://pterots:aZxmaine!302@cluster0.tm2cs.mongodb.net/PteroDB?retryWrites=true&w=majority";

const logSchema = new mongoose.Schema({});

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  function (error: Error) {
    if (error) console.log("Error:" + error);
  },
);

module.exports = function (req, res) {
  if (req.method === "GET") {
  }
};
