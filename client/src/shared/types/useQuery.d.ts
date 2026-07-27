import "@tanstack/react-query";
import type { ErrorResponse } from "../utils/requestHandler";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ErrorResponse;
  }
}
