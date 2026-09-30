import styles from "./BoardHeader.module.scss";
import { useGetColumnsByBoardId, useOpenBoardStore } from "@/features/board";
import { useDropdown } from "@/shared/hooks/useDropdown";

import VerticalEllipsisIcon from "@/assets/icon-vertical-ellipsis.svg?react";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import { useDialogStore } from "@/shared/stores";

export const BoardHeader = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const { openDialog } = useDialogStore.getState();
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns = [] } = useGetColumnsByBoardId(openBoardId ?? "");
  const boardName = useOpenBoardStore((s) => s.openBoard.name);
  const startUpdateBoard = useCurrentBoardStore((s) => s.startUpdateBoard);

  const handleEditBoard = () => {
    startUpdateBoard(boardName, columns);
    openDialog("updateBoard");
    toggle();
  };

  const handleDeleteBoard = async () => {
    openDialog("deleteBoard");
    toggle();
  };

  return (
    <div className={styles.boardHeader}>
      <h1 className={styles.boardHeader__title}>{boardName}</h1>
      <div className={styles.dropdown} ref={dropdownRef}>
        <button className={styles.dropdown__toggle} onClick={toggle}>
          <VerticalEllipsisIcon />
        </button>

        {openDropdown && (
          <ul className={styles.dropdown__menu}>
            <li onClick={handleEditBoard}>Edit Board</li>
            <li onClick={handleDeleteBoard}>Delete Board</li>
          </ul>
        )}
      </div>
    </div>
  );
};
