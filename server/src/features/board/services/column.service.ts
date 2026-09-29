import Column from "../models/Column.js";
import Board from "../models/Board.js";
import {
  searchDocument,
  searchDocumentAndDelete,
  searchDocumentAndUpdate,
} from "@/shared/utils/searchDocument.js";
import {
  AppError,
  ConflictError,
  NotFoundError,
} from "@/shared/utils/customErrors.js";
import type {
  ColumnBulkCreateBody,
  ColumnCreateBody,
  ColumnUpdateBody,
} from "../types/column.types.js";
import { columnsQueryOptions } from "@/config/mongoose.js";
import type { Schema, Types } from "mongoose";

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

  const columnNames = columns.map((column) => column.name);
  const uniqueNames = new Set(columnNames);

  const newColumns = [...uniqueNames].map((name) => {
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

export const updateColumn = async (
  columnId: string,
  updates: ColumnUpdateBody,
) => {
  const column = await searchDocumentAndUpdate(columnId, Column, updates);
  if (!column) throw new NotFoundError("column");
  return column;
};

export const updateColumnsByBoardId = async (
  columns: ColumnBulkCreateBody[],
) => {
  const updatedColumns = await Promise.all(
    columns.map((c) => searchDocumentAndUpdate(c.id, Column, c.updates)),
  );
  const filteredColumns = updatedColumns.filter((column) => column !== null);
  return filteredColumns;
};

export const deleteColumnsByBoardId = async (columnIds: string[]) => {
  await Promise.all(columnIds.map((id) => searchDocumentAndDelete(id, Column)));
  return columnIds;
};

export const deleteColumn = async (columnId: string) => {
  const deletedColumn = await searchDocumentAndDelete(columnId, Column);
  if (!deletedColumn) throw new NotFoundError("column");
  return deletedColumn;
};
