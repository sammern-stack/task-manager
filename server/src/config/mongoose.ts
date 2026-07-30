import type { ColumnSchema } from "@/features/board/types/column.types.js";
import type { QueryOptions } from "mongoose";

export const queryOptions: QueryOptions = {
  returnDocument: "after",
  runValidators: true,
};

export const columnsQueryOptions: QueryOptions<ColumnSchema> = {
  returnDocument: "after",
  runValidators: true,
};
