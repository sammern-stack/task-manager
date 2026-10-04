import type { BoardColumn } from "../stores/currentBoardStore";

export const normalizeColumns = (columns: BoardColumn[]) =>
  columns
    .map((col) => col.column.name)
    .filter((name) => name.length > 0)
    .map((name) => ({ name }));
