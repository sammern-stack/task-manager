import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OpenBoardStore {
  openBoardId: string | null;
  setOpenBoardId: (boardId: string) => void;
}

export const useOpenBoardStore = create<OpenBoardStore>()(
  persist(
    (set) => ({
      openBoardId: null,
      setOpenBoardId: (boardId) => set({ openBoardId: boardId }),
    }),
    {
      name: "openBoard",
      partialize: (s) => ({
        openBoardId: s.openBoardId,
      }),
    },
  ),
);
