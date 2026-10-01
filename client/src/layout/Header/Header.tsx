import styles from "./Header.module.scss";
import { useGetColumnsByBoardId, useOpenBoardStore } from "@/features/board";
import { useDropdown } from "@/shared/hooks/useDropdown";

import VerticalEllipsisIcon from "@/assets/icon-vertical-ellipsis.svg?react";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import { useDialogStore } from "@/shared/stores";

export const Header = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const { openDialog } = useDialogStore.getState();
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns = [] } = useGetColumnsByBoardId(openBoardId ?? "");
  const boardName = useOpenBoardStore((s) => s.openBoard.name);
  const startUpdateBoard = useCurrentBoardStore((s) => s.startUpdateBoard);

  const onEditBoard = () => {
    startUpdateBoard(boardName, columns);
    openDialog("updateBoard");
    toggle();
  };

  const onDeleteBoard = async () => {
    openDialog("deleteBoard");
    toggle();
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>{boardName}</h1>
      <div className={styles.header__boardDropdown} ref={dropdownRef}>
        <button className={styles.header__boardToggle} onClick={toggle}>
          <VerticalEllipsisIcon />
        </button>

        {openDropdown && (
          <ul className={styles.header__boardMenu}>
            <li onClick={onEditBoard}>Edit Board</li>
            <li onClick={onDeleteBoard}>Delete Board</li>
          </ul>
        )}
      </div>
    </div>
  );
};
