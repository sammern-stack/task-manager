import styles from "./BoardHeader.module.scss";
import { BoardMenu, useOpenBoardStore } from "@/features/board";
import { Dropdown } from "@/shared/components";
import VerticalEllipsisIcon from "@/assets/icon-vertical-ellipsis.svg?react";

export const BoardHeader = () => {
  const openBoardName = useOpenBoardStore((s) => s.openBoard.name);

  return (
    <div className={styles.boardHeader}>
      <h1 className={styles.boardHeader__title}>{openBoardName}</h1>
      <Dropdown
        className={styles.boardHeader__menuDropdown}
        toggle={boardMenuToggle}
      >
        <BoardMenu />
      </Dropdown>
    </div>
  );
};

const boardMenuToggle = (
  <div className={styles.boardHeader__menuButton}>
    <VerticalEllipsisIcon />
  </div>
);
