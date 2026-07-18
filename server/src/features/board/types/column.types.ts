import type { Document, Types } from "mongoose";

export type ColumnSchema = {
  name: string;
  boardId: Types.ObjectId;
} & Document;

export type ColumnCreateBody = Pick<ColumnSchema, "name">;
