export type ColumnSchema = {
  _id: string;
  name: string;
  boardId: string;
  createdAt: string;
  updatedAt: string;
};

export type ColumnCreateBody = Pick<ColumnSchema, "name">;
export type ColumnBulkCreateBody = {
  columns: ColumnCreateBody[];
};
