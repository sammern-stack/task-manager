import styles from "./BoardList.module.scss";
import { useEffect } from "react";
import { BoardListCard } from "./BoardListCard";
import { useBoards } from "../../../hooks/useBoards";
import { Heading } from "@/shared/components";
import { useOpenBoardStore } from "@/features/board/stores/openBoardStore";

export const BoardList = () => {
  const { data: boards } = useBoards();
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { setOpenBoard } = useOpenBoardStore.getState()

  const boardsList = boards?.data;
  const boardLength = boards?.meta?.["length"];
  const boardCount = (typeof boardLength === "number" && boardLength) as number;

  useEffect(() => {
    if (!boards?.data) return;
    if (boards.data.some((board) => openBoardId === board._id)) return;
    setOpenBoard({ id: boards.data[0]._id })
  }, [boards, openBoardId, setOpenBoard]);

  return (
    <div className={styles.boardList}>
      <Heading size="h2" variant="withCount" count={boardCount}>
        All boards
      </Heading>
      {boardsList?.map((board) => (
        <BoardListCard key={board._id} variant="board" board={board} />
      ))}
      <BoardListCard variant="createBtn" />
    </div>
  );
};
