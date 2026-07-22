import styles from "./BoardList.module.scss";
import { BoardListCard } from "./BoardListCard";
import { useBoards } from "../../../hooks/useBoards";
import { Heading } from "@/shared/components";

export const BoardList = () => {
  const { data: boards } = useBoards();

  const boardsList = boards?.data;
  const metaLength = boards?.meta?.["length"];
  const boardCount = (typeof metaLength === "number" && metaLength) as number;

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
