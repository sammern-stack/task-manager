import type { BoardColumn } from "../stores/currentBoardStore";
import type { FormSubtask } from "../stores/taskFormStore";

export const normalizeColumns = (columns: BoardColumn[]) =>
  columns
    .map((col) => col.column.name)
    .filter((name) => name.length > 0)
    .map((name) => ({ name }));

export const normalizeSubtasks = (subtasks: FormSubtask[]) =>
  subtasks
    .map((sub) => sub.subtask.name)
    .filter((name) => name.length > 0)
    .map((name) => ({ name }));
