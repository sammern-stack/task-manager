import styles from "./BoardHeader.module.scss";
import { BoardMenu, useOpenBoardStore } from "@/features/board";
import { useDropdown } from "@/shared/hooks/useDropdown";

import VerticalEllipsisIcon from "@/assets/icon-vertical-ellipsis.svg?react";

export const BoardHeader = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const openBoardName = useOpenBoardStore((s) => s.openBoard.name);

  return (
    <div className={styles.boardHeader}>
      <h1 className={styles.boardHeader__title}>{openBoardName}</h1>
      <div className={styles.dropdown} ref={dropdownRef}>
        <button className={styles.dropdown__toggle} onClick={toggle}>
          <VerticalEllipsisIcon />
        </button>

        {openDropdown && (
          <div className={styles.dropdown__menu}>
            <BoardMenu closeMenu={toggle} />
          </div>
        )}
      </div>
    </div>
  );
};
