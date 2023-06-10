import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongodb Connected");
    return;
  }

  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "shared-prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Mongodb Connected");
  } catch (error) {
    console.log(error);
  }
};
