import { Schema, model } from "mongoose";
import type {
  ColumnModel,
  ColumnSchema,
  ColumnStatics,
} from "../types/column.types.js";

const columnSchema = new Schema<
  ColumnSchema,
  ColumnModel,
  {},
  {},
  {},
  ColumnStatics
>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    boardId: { type: Schema.Types.ObjectId, required: true, ref: "board" },
  },
  { timestamps: true },
);

columnSchema.statics.findByName = function (columnName) {
  return this.findOne({ name: columnName }).exec();
};

const Column = model<ColumnSchema, ColumnModel>("column", columnSchema);
export default Column;
