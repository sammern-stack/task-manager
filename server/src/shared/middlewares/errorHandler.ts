import type { Request, Response, NextFunction } from "express";
import { NODE_ENV } from "@/config/env.js";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // If the headers have already been sent,
  // delegate to the default Express error handler
  if (res.headersSent) return next(error);

  const isProd = NODE_ENV === "production";
  const err = error instanceof Error ? error : new Error("Unknown Error");

  console.log(`Unexpected Error: ${err}`);

  res.status(500).json({
    ok: false,
    message: isProd ? "Something went wrong" : err.message,
  });
};
