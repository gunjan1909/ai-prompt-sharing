// This file has the code for the function connectToDB() which is used for connecting to the database via mongoose client

import mongoose, { mongo } from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "prompt-share",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDb connected");
  } catch (err) {
    console.log(err);
  }
};
