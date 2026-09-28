import type { BoardSchema } from "@/shared/types/board.types";
import { useOpenBoardStore } from "../stores/openBoardStore";
import { useEffect } from "react";

export const useSelectFirstBoard = (boards: BoardSchema[]) => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);

  useEffect(() => {
    const { setOpenBoard } = useOpenBoardStore.getState();
    if (!boards?.length) return;
    if (boards?.some((board) => openBoardId === board._id)) return;
    setOpenBoard({ id: boards[0]?._id });
  }, [boards, openBoardId]);
};
