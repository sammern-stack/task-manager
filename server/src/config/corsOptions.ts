import { CLIENT_URL } from "./env.js";
import type { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: CLIENT_URL,
  credentials: true,
}
