import Column from "../models/Column.js";
import Board from "../models/Board.js";
import { searchDocument } from "@/shared/utils/searchDocument.js";
import { NotFoundError } from "@/shared/utils/customErrors.js";
import type { ColumnCreateBody } from "../types/column.types.js";

export const getColumnsByBoardId = async (boardId: string) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError("board");

  const columns = await Column.find({ boardId: board._id });
  return columns;
};

export const createColumn = async (
  column: ColumnCreateBody,
  boardId: string,
) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError("board");

  const newColumn = await Column.create({
    name: column.name,
    boardId: board._id,
  });

  return newColumn;
};

export const createColumns = async (
  columns: ColumnCreateBody[],
  boardId: string,
) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError("board");

  const newColumns = columns.map((column) => ({
    name: column.name,
    boardId: board._id,
  }));

  const insertedColumns = await Column.insertMany(newColumns);
  return insertedColumns;
};
