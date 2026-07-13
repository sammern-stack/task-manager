import express from "express";
import cors from "cors";
import { errorHandler } from "@/shared/middlewares/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Error handling middleware
app.use(errorHandler);

export default app;
