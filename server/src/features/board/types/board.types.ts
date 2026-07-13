import type { Document } from "mongoose";

export type BoardSchema = {
  name: string;
} & Document;

export type BoardCreateBody = Pick<BoardSchema, "name">;
