import express from "express";
import cors from "cors";
import { corsOptions } from "@/config/corsOptions.js";
import { errorHandler } from "@/shared/middlewares/errorHandler.js";
import apiRoutes from "@/routes/api.route.js";

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
