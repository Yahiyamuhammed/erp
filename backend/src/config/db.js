import mongoose from "mongoose";

import "../models/Permission.js";
import "../models/Role.js";
import "../models/User.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
