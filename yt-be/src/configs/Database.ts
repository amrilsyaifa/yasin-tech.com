import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const DB_USER = process.env.DB_USER;
    const DB_PASSWORD = process.env.DB_PASSWORD;
    const DB_HOST = process.env.DB_HOST;
    const DB_NAME = process.env.DB_NAME;
    const DB_PORT = process.env.DB_PORT;
    const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
    if (url) {
      await mongoose.connect(url);
      console.log("Database connected");
    } else {
      console.log("Cannot read env");
    }
  } catch (error) {
    console.log("Database not connected ", error);
  }
};

export default connectDB;
