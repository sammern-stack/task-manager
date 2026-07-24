import Column from "../models/Column.js";
import Board from "../models/Board.js";
import { searchDocument } from "@/shared/utils/searchDocument.js";
import {
  AppError,
  ConflictError,
  NotFoundError,
} from "@/shared/utils/customErrors.js";
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

  const columnExist = await Column.findByName(column.name);
  if (columnExist) {
    throw new ConflictError("Cant create. Column with same name already exist");
  }

  const columnName = column.name.trim();
  if (columnName === "") {
    throw new AppError("Column name can't be empty", 400);
  }

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

  const uniqueNames = [...new Set(columns.map((column) => column.name))];
  const newColumns = uniqueNames.map((name) => {
    const columnName = name.trim();
    if (columnName === "") {
      throw new AppError("Column name can't be empty", 400);
    }

    return {
      name: columnName,
      boardId: board._id,
    };
  });

  const insertedColumns = await Column.insertMany(newColumns);
  return insertedColumns;
};
