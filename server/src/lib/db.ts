import { connect } from "mongoose";
import { MONGODB_URI } from "@/config/env.js";

export const connectDB = async () => {
  try {
    const conn = await connect(MONGODB_URI);
    console.log(`Database connected at: ${conn.connection.host}`);
  } catch (err) {
    console.log("Error occurred while connecting to DB", err);
    process.exit(1);
  }
};
