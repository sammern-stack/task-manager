export type ColumnSchema = {
  _id: string;
  name: string;
  boardId: string;
  createdAt: string;
  updatedAt: string;
};

export type ColumnProperties = Omit<
  ColumnSchema,
  "_id" | "boardId" | "createdAt" | "updatedAt"
>;

export type UpdateColumnBody = Partial<ColumnProperties>;
export type CreateColumnBody = ColumnProperties;

export type BulkUpdateColumnsBody = {
  id: string;
  updates: UpdateColumnBody;
};
