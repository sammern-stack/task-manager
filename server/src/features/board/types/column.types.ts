import type { HydratedDocument, Model, Types } from "mongoose";

export type ColumnSchema = {
  name: string;
  boardId: Types.ObjectId;
};

export type ColumnDocument = HydratedDocument<ColumnSchema>;

export interface ColumnStatics {
  findByName(
    this: ColumnModel,
    columnName: string,
  ): Promise<ColumnDocument | null>;
}

export interface ColumnModel extends Model<ColumnSchema>, ColumnStatics {}

export type ColumnCreateBody = Omit<ColumnSchema, "boardId">;
export type ColumnUpdateBody = Omit<ColumnSchema, "boardId">;

export type ColumnBulkCreateBody = {
  id: string;
  updates: ColumnUpdateBody;
}
