import { Schema, model } from "mongoose";
import type {
  BoardSchema,
  BoardModel,
  BoardStatics,
} from "../types/board.types.js";

const boardSchema = new Schema<
  BoardSchema,
  BoardModel,
  {},
  {},
  {},
  BoardStatics
>(
  {
    name: {
      type: String,
      default: "Untitled Board",
      trim: true,
    },
  },
  { timestamps: true },
);

boardSchema.statics.findByName = function (boardName) {
  return this.findOne({ name: boardName }).exec();
};

const Board = model<BoardSchema, BoardModel>("board", boardSchema);
export default Board;
