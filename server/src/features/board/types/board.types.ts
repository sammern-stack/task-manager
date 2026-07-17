import type { Document } from "mongoose";

export type BoardSchema = {
  name: string;
} & Document;

export type BoardCreateBody = Partial<Pick<BoardSchema, "name">>;
export type BoardUpdateBody = Partial<Pick<BoardSchema, "name">>;
