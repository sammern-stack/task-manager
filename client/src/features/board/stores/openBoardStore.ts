import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ColumnSchema } from "@/shared/types/column.types";

type OpenBoard = {
  id: string;
  name: string;
  columns: ColumnSchema[] | null;
};

interface OpenBoardStore {
  openBoard: OpenBoard;
  setOpenBoard: (board: Partial<OpenBoard>) => void;
}

export const useOpenBoardStore = create<OpenBoardStore>()(
  persist(
    (set) => ({
      openBoard: {
        id: "",
        name: "",
        columns: null,
      },

      setOpenBoard: (board) => {
        set((s) => ({ openBoard: { ...s.openBoard, ...board } }));
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
