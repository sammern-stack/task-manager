import Board from "../models/Board.js";
import { queryOptions } from "@/config/mongoose.js";
import {
  AppError,
  ConflictError,
  NotFoundError,
} from "@/shared/utils/customErrors.js";
import { searchDocument } from "@/shared/utils/searchDocument.js";
import type { BoardCreateBody, BoardUpdateBody } from "../types/board.types.js";

export const getAllBoards = async () => {
  const boards = await Board.find();
  return boards;
};

export const getBoardById = async (boardId: string) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError("board");
  return board;
}

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

export const deleteBoard = async (boardId: string) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError("board");
  await Board.findByIdAndDelete(board._id);
  return board;
};

export const updateBoard = async (
  boardId: string,
  updates: BoardUpdateBody,
) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError("board");
  const updatedBoard = await Board.findByIdAndUpdate(
    boardId,
    updates,
    queryOptions,
  );
  if (!updatedBoard) throw new AppError("Couldn't update board", 400);
  return updatedBoard;
};
