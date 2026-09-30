import Board from "../models/Board.js";
import Column from "../models/Column.js";
import Task from "../models/Task.js";
import { NotFoundError } from "@/shared/utils/customErrors.js";
import {
  searchDocument,
  searchDocumentAndUpdate,
  searchDocumentAndDelete,
} from "@/shared/utils/searchDocument.js";
import type { CreateTaskBody, UpdateTaskBody } from "../types/task.types.js";

export const getTasksByBoardId = async (boardId: string) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError(`board with id (${boardId})`);

  const tasks = await Task.find({ boardId });
  return tasks;
};

export const getTaskById = async (boardId: string, taskId: string) => {
  const task = await searchDocument({ _id: taskId, boardId }, Task);
  if (!task) throw new NotFoundError(`task with id ${taskId}`);
  return task;
};

export const createTask = async (
  boardId: string,
  columnId: string,
  task: CreateTaskBody,
) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError(`board with id (${boardId})`);

  const column = await searchDocument(
    { boardId: board._id, _id: columnId },
    Column,
  );
  if (!column) throw new NotFoundError(`column with id (${columnId})`);

  const newTask = await Task.create({ ...task, boardId, columnId });
  return newTask;
};

export const updateTask = async (
  boardId: string,
  taskId: string,
  updates: UpdateTaskBody,
) => {
  const updatedTask = await searchDocumentAndUpdate(
    { _id: taskId, boardId },
    Task,
    updates,
  );
  if (!updatedTask) throw new NotFoundError(`task with id ${taskId}`);
  return updatedTask;
};

export const deleteTask = async (boardId: string, taskId: string) => {
  const deletedTask = await searchDocumentAndDelete(
    { _id: taskId, boardId },
    Task,
  );
  if (!deletedTask) throw new NotFoundError(`task with id ${taskId}`);
  return deletedTask;
};
