import { Schema, model } from "mongoose";
import type { BoardSchema } from "../types/board.types.js";

const boardSchema = new Schema<BoardSchema>(
  {
    name: {
      type: String,
      default: "Untitled Board",
      trim: true,
    },
  },
  { timestamps: true },
);

const Board = model("board", boardSchema);
export default Board;
