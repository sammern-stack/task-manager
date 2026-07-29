import type { ColumnSchema } from "@/shared/types/column.types";
import { create } from "zustand";

type NewColumn = Omit<
  ColumnSchema,
  "_id" | "boardId" | "createdAt" | "updatedAt"
>;

type BoardVariant = "createBoard" | "updateBoard";

type Board = {
  name: string;
  columns: {
    id: string;
    column: ColumnSchema | NewColumn;
  }[];
};

interface CurrentBoard {
  boardVariant: BoardVariant | null;
  board: Board | null;
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
    set({
      boardVariant: "updateBoard",
      board: {
        name,
        columns: columns.map((column) => ({ id: crypto.randomUUID(), column })),
      },
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
