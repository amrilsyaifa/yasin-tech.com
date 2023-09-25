import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (DATABASE_URL) {
      await mongoose.connect(DATABASE_URL);
      console.log("Database connected");
    } else {
      console.log("Cannot read env");
    }
  } catch (error) {
    console.log("Database not connected ", error);
  }
};

export default connectDB;
