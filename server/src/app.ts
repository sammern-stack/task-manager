import express from "express";
import cors from "cors";

const app = express()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

export default app;
