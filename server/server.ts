import "dotenv/config";
import app from "@/app.js";
import { PORT } from "@/config/env.js";

const SERVER_START_MSG = `Server is running with port: ${PORT}`;

const startServer = async () => {
  app.listen(PORT, () => console.log(SERVER_START_MSG));
};

startServer();
