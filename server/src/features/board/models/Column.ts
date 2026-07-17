import { Schema, model } from "mongoose";
import type { ColumnSchema } from "../types/column.types.js";

const columnSchema = new Schema<ColumnSchema>(
  {
    name: { type: String, required: true, trim: true },
    boardId: { type: Schema.Types.ObjectId, required: true, ref: "board" },
  },
  { timestamps: true },
);

const Column = model("column", columnSchema);
export default Column;
