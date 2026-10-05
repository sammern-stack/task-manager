import Task from "../models/Task.js";
import { searchDocument } from "@/shared/utils/searchDocument.js";
import { NotFoundError } from "@/shared/utils/customErrors.js";
import type {
  CreateSubtasksBody,
  DeleteSubtasksBody,
  UpdateSubtasksBody,
} from "../types/task.types.js";
import Board from "../models/Board.js";
import Column from "../models/Column.js";

const verifyTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
) => {
  const board = await searchDocument(boardId, Board);
  if (!board) throw new NotFoundError(`board with id ${boardId}`);

  const column = await searchDocument({ _id: columnId, boardId }, Column);
  if (!column) throw new NotFoundError(`column with id ${columnId}`);

  const task = await searchDocument({ _id: taskId, boardId, columnId }, Task);
  if (!task) throw new NotFoundError(`task with id ${taskId}`);

  return task;
};

export const createSubtasks = async (
  boardId: string,
  columnId: string,
  taskId: string,
  subtasks: CreateSubtasksBody,
) => {
  const task = await verifyTask(boardId, columnId, taskId);

  const subtasksToSave = subtasks.map((subtask) => ({
    ...subtask,
    isCompleted: false,
  }));
  task.subtasks.push(...subtasksToSave);

  await task.save();
  return task;
};

export const updateSubtasks = async (
  boardId: string,
  columnId: string,
  taskId: string,
  updates: UpdateSubtasksBody,
) => {
  const task = await verifyTask(boardId, columnId, taskId);

  updates.forEach(({ id, updates }) => {
    const target = task.subtasks.id(id);
    if (!target) throw new NotFoundError(`subtask with id ${id}`);
    Object.assign(target, updates);
  });

  await task.save();
  return task;
};

export const deleteSubtasks = async (
  boardId: string,
  columnId: string,
  taskId: string,
  subtaskIds: DeleteSubtasksBody,
) => {
  const task = await verifyTask(boardId, columnId, taskId);

  subtaskIds.forEach(({ id }) => {
    const target = task.subtasks.id(id);
    if (!target) throw new NotFoundError(`subtask with id ${id}`);
    target.deleteOne();
  });

  await task.save();
  return task;
};

export const toggleSubtask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  subtaskId: string,
) => {
  const task = await verifyTask(boardId, columnId, taskId);

  const subtask = task.subtasks.id(subtaskId);
  if (!subtask) throw new NotFoundError(`subtask with id ${subtaskId}`);

  subtask.isCompleted = !subtask.isCompleted;
  await task.save();
  return task;
};
