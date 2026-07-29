import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ColumnSchema } from "@/shared/types/column.types";

type OpenBoard = {
  id: string | null;
  name: string;
  columns: ColumnSchema[] | null;
};

interface OpenBoardStore {
  openBoard: OpenBoard;
  setOpenBoard: (board: Partial<OpenBoard>) => void;
  setOpenBoardId: (boardId: string) => void;
  setOpenBoardName: (boardName: string) => void;
}

export const useOpenBoardStore = create<OpenBoardStore>()(
  persist(
    (set) => ({
      openBoard: {
        id: null,
        name: "",
        columns: null,
      },

      setOpenBoard: (board) => {
        set((s) => ({ openBoard: { ...s.openBoard, ...board } }));
      },

      setOpenBoardId: (boardId) => {
        set((s) => ({ openBoard: { ...s.openBoard, id: boardId } }));
      },

      setOpenBoardName: (boardName) => {
        set((s) => ({ openBoard: { ...s.openBoard, name: boardName } }));
      },
    }),
    {
      name: "openBoard",
      partialize: (s) => ({
        openBoard: s.openBoard,
      }),
    },
  ),
);
