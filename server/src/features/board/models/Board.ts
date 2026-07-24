import { Schema, model } from "mongoose";
import type { BoardSchema, BoardModel } from "../types/board.types.js";

const boardSchema = new Schema<BoardSchema, BoardModel>(
  {
    name: {
      type: String,
      default: "Untitled Board",
      trim: true,
    },
  },
  { timestamps: true },
);

boardSchema.static("findByName", function (boardName: string) {
  return this.findOne({ name: boardName }).exec();
});

const Board = model<BoardSchema, BoardModel>("board", boardSchema);
export default Board;
