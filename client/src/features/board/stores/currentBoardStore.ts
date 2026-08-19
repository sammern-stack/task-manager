import { create } from "zustand";
import type {
  CreateColumnBody,
  ColumnSchema,
  BulkUpdateColumnsBody,
  ColumnProperties,
} from "@/shared/types/column.types";

type Board = {
  name: string;
  columns: BoardColumn[];
};

type BoardColumn = { id: string; column: ColumnSchema | ColumnProperties };

interface CurrentBoard {
  boardVariant: "createBoard" | "updateBoard" | null;
  board: Board | null;
  originalColumns: BoardColumn[] | null;

  buildCreateColumnsArray: () => CreateColumnBody[] | undefined;
  buildUpdateColumnsArray: () => BulkUpdateColumnsBody[] | undefined;
  buildDeleteColumnsArray: () => string[] | undefined;

  startCreateBoard: () => void;
  startUpdateBoard: (name: string, columns: ColumnSchema[]) => void;

  setBoardName: (name: string) => void;

  addColumn: () => void;
  removeColumn: (columnId: string) => void;
  setColumnName: (columnId: string, name: string) => void;
}

export const useCurrentBoardStore = create<CurrentBoard>((set, get) => ({
  boardVariant: null,
  board: null,
  originalColumns: null,

  buildCreateColumnsArray: () => {
    const state = get();
    if (!state.board || !state.originalColumns) return;

    const current = state.board.columns;

    return (
      current
        .map((col) => col.column)
        .filter((col) => !("_id" in col)) as CreateColumnBody[]
    ).filter((column) => column.name.length > 0);
  },
  buildUpdateColumnsArray: () => {
    const state = get();
    if (!state.board || !state.originalColumns) return;

    const original = state.originalColumns;
    const current = state.board.columns;

    const originalColumns = original
      .map((col) => col.column)
      .filter((col) => "_id" in col);

    const existingColumns = current
      .map((col) => col.column)
      .filter((col) => "_id" in col);

    return existingColumns
      .map((column) => {
        const originalColumn = originalColumns.find(
          (col) => col._id === column._id,
        );
        if (!originalColumn) return;

        const hasUpdates = originalColumn.name !== column.name;

        if (hasUpdates)
          return {
            id: column._id,
            updates: {
              name: column.name,
            },
          };
      })
      .filter((item) => item !== undefined);
  },
  buildDeleteColumnsArray: () => {
    const state = get();
    if (!state.board || !state.originalColumns) return;

    const original = state.originalColumns;
    const current = state.board.columns;

    return (
      original
        .filter((column) => !current.some((col) => col.id === column.id))
        .map((column) => column.column) as ColumnSchema[]
    ).map((column) => column._id);
  },

  startCreateBoard: () => {
    set({
      boardVariant: "createBoard",
      board: {
        name: "",
        columns: [{ id: crypto.randomUUID(), column: { name: "Todo" } }],
      },
    });
  },
  startUpdateBoard: (name, columns) => {
    const boardColumns = columns.map((column) => ({
      id: crypto.randomUUID(),
      column,
    }));

    set({
      boardVariant: "updateBoard",
      board: { name, columns: boardColumns },
      originalColumns: boardColumns,
    });
  },

  setBoardName: (name) => {
    const state = get();
    if (!state.board) return;

    set({ board: { name, columns: state.board.columns } });
  },

  addColumn: () => {
    const state = get();
    if (!state.board) return;

    set({
      board: {
        ...state.board,
        columns: [
          ...state.board.columns,
          { id: crypto.randomUUID(), column: { name: "New Column" } },
        ],
      },
    });
  },
  removeColumn: (columnId) => {
    const state = get();
    if (!state.board) return;

    set({
      board: {
        ...state.board,
        columns: state.board.columns.filter((col) => col.id !== columnId),
      },
    });
  },
  setColumnName: (columnId, name) => {
    const state = get();
    if (!state.board) return;

    const column = state.board.columns.find((col) => col.id === columnId);
    if (!column) return;

    set({
      board: {
        ...state.board,
        columns: state.board.columns.map((col) =>
          col.id === columnId
            ? { ...column, column: { ...column.column, name } }
            : col,
        ),
      },
    });
  },
}));
