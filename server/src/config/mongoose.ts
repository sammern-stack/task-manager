import type { QueryOptions } from "mongoose";

export const queryOptions: QueryOptions = {
  returnDocument: "after",
  runValidators: true,
};
