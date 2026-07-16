import { AppError } from "@/shared/utils/customErrors.js";
import { isMongooseId } from "@/shared/utils/validators.js";
import type { Model, QueryFilter } from "mongoose";

export const searchDocument = async <T>(
  documentIdOrMeta: string | QueryFilter<T>,
  model: Model<T>,
) => {
  const isId =
    typeof documentIdOrMeta === "string" && isMongooseId(documentIdOrMeta);

  if (!isId && typeof documentIdOrMeta !== "object")
    throw new AppError("Invalid search parameter", 400);

  const document = isId
    ? await model.findById(documentIdOrMeta)
    : await model.findOne(documentIdOrMeta as QueryFilter<T>);

  return !document ? null : document;
};
