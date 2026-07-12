import "dotenv/config";
import app from "@/app.js";
import { PORT } from "@/config/env.js";
import { connectDB } from "@/lib/db.js";

const SERVER_START_MSG = `Server is running with port: ${PORT}`;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(SERVER_START_MSG));
};

startServer();
