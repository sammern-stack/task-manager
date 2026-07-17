import { create } from "zustand";
import { persist } from "zustand/middleware";

type OpenBoard = {
  id: string | null;
  name: string;
};

interface OpenBoardStore {
  openBoard: OpenBoard;
  setOpenBoard: (board: OpenBoard) => void;
  setOpenBoardId: (boardId: string) => void;
  setOpenBoardName: (boardName: string) => void;
}

export const useOpenBoardStore = create<OpenBoardStore>()(
  persist(
    (set) => ({
      openBoard: {
        id: null,
        name: "",
      },

      setOpenBoard: (board) => set({ openBoard: board }),

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
