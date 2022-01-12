const mongoose = require("mongoose");

const ConnectionDB = async () => {
  mongoose
    .connect(process.env.MONGODB_CNN,{
      autoIndex:true,
      autoCreate:true,
    })
    .then((connection) => {
      console.log("connection successfully");
    })
    .catch((error) => {
      console.log("ERROR", error);
      throw new Error("Error when connecting to the database");
    });
};

module.exports = {
  ConnectionDB,
};
