import Column from "../models/Column.js";
import Board from "../models/Board.js";
import {
  searchDocument,
  searchDocumentAndDelete,
  searchDocumentAndUpdate,
} from "@/shared/utils/searchDocument.js";
import {
  AppError,
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "@/shared/utils/customErrors.js";
import type {
  ColumnBulkCreateBody,
  ColumnCreateBody,
  ColumnUpdateBody,
} from "../types/column.types.js";
import type { Types } from "mongoose";

export const getColumns = async (boardId: string) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError("board");

  const columns = await Column.find({ boardId: board._id });
  return columns;
};

export const getColumnById = async (boardId: string, columnId: string) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError(`Board with id ${boardId}`);

  const column = await searchDocument(
    { _id: columnId, boardId: board._id },
    Column,
  );
  if (!column) throw new NotFoundError(`Column with id ${columnId}`);

  return column;
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

export const updateColumn = async (
  columnId: string,
  updates: ColumnUpdateBody,
) => {
  const column = await searchDocumentAndUpdate(columnId, Column, updates);
  if (!column) throw new NotFoundError("column");
  return column;
};

export const deleteColumn = async (columnId: string) => {
  const deletedColumn = await searchDocumentAndDelete(columnId, Column);
  if (!deletedColumn) throw new NotFoundError("column");
  return deletedColumn;
};


export const createColumns = async (
  columns: ColumnCreateBody[],
  boardId: string,
) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError("board");

  const columnNames = columns.map((column) => column.name.trim());
  const uniqueNames = new Set(columnNames);

  const newColumns = [...uniqueNames].map((name) => {
    if (name === "") throw new BadRequestError("Column name can't be empty");
    return { name, boardId: board._id };
  });

  const insertedColumns = await Column.insertMany(newColumns);
  return insertedColumns;
};



export const updateColumns = async (
  columns: ColumnBulkCreateBody[],
) => {
  const updatedColumns = await Promise.all(
    columns.map((c) => searchDocumentAndUpdate(c.id, Column, c.updates)),
  );
  const filteredColumns = updatedColumns.filter((column) => column !== null);
  return filteredColumns;
};

export const deleteColumns = async (columnIds: string[]) => {
  await Promise.all(columnIds.map((id) => searchDocumentAndDelete(id, Column)));
  return columnIds;
};

