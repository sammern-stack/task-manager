import Board from "../models/Board.js";
import type { BoardCreateBody } from "../types/board.types.js";

export const getAllBoards = async () => {
  const boards = await Board.find();
  return boards;
};

export const createNewBoard = async (board: BoardCreateBody) => {
  const newBoard = await Board.create(board);
  return newBoard;
};
