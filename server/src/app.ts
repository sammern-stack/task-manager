import express from "express";
import cors from "cors";
import { errorHandler } from "@/shared/middlewares/errorHandler.js";
import apiRoutes from "@/routes/api.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
