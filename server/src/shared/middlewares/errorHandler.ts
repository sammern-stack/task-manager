import type { Request, Response, NextFunction } from "express";
import { AppError } from "@/shared/utils/customErrors.js";
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
  const err = error instanceof AppError ? error : new Error("Unknown Error");
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  console.log(`Unexpected Error: ${err}`);

  res.status(statusCode).json({
    ok: false,
    message: isProd ? "Something went wrong" : err.message,
  });
};
