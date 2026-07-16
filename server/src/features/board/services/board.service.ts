import Board from "../models/Board.js";
import { ConflictError } from "@/shared/utils/customErrors.js";
import type { BoardCreateBody } from "../types/board.types.js";

export const getAllBoards = async () => {
  const boards = await Board.find();
  return boards;
};

export const createNewBoard = async (board: BoardCreateBody) => {
  // Create board with the default name
  if (!board.name) return await Board.create({});

  const boardExists = await Board.findOne({ name: board.name });
  if (boardExists) {
    throw new ConflictError("Cant create. Board with same name already exist");
  }

  const newBoard = await Board.create(board);
  return newBoard;
};
