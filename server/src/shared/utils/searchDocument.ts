import { AppError } from "@/shared/utils/customErrors.js";
import { isMongooseId } from "@/shared/utils/validators.js";
import type { Model, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";

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

  return document;
};

export const searchDocumentAndUpdate = async <T>(
  documentIdOrMeta: string | QueryFilter<T>,
  model: Model<T>,
  updates: UpdateQuery<T>,
) => {
  const isId =
    typeof documentIdOrMeta === "string" && isMongooseId(documentIdOrMeta);

  if (!isId && typeof documentIdOrMeta !== "object")
    throw new AppError("Invalid search parameter", 400);

  const queryOptions: QueryOptions<T> = {
    returnDocument: "after",
    runValidators: true,
  };

  const document = isId
    ? await model.findByIdAndUpdate(documentIdOrMeta, updates, queryOptions)
    : await model.findOneAndUpdate(
        documentIdOrMeta as QueryFilter<T>,
        updates,
        queryOptions,
      );

  return document;
};

export const searchDocumentAndDelete = async <T>(
  documentIdOrMeta: string | QueryFilter<T>,
  model: Model<T>,
) => {
  const isId =
    typeof documentIdOrMeta === "string" && isMongooseId(documentIdOrMeta);

  if (!isId && typeof documentIdOrMeta !== "object")
    throw new AppError("Invalid search parameter", 400);

  const document = isId
    ? await model.findByIdAndDelete(documentIdOrMeta)
    : await model.findOneAndDelete(documentIdOrMeta as QueryFilter<T>);

  return document;
};
