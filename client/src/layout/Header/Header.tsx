import styles from "./Header.module.scss";
import { useHeader } from "./useHeader";
import { useDropdown } from "@/shared/hooks/useDropdown";
import VerticalEllipsisIcon from "@/assets/icon-vertical-ellipsis.svg?react";

export const Header = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const { onEditBoard, onDeleteBoard, boardName } = useHeader();

  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>{boardName}</h1>
      <div className={styles.header__boardDropdown} ref={dropdownRef}>
        <button className={styles.header__boardToggle} onClick={toggle}>
          <VerticalEllipsisIcon />
        </button>

        {openDropdown && (
          <ul className={styles.header__boardMenu}>
            <li onClick={() => (onEditBoard(), toggle())}>Edit Board</li>
            <li onClick={() => (onDeleteBoard(), toggle())}>Delete Board</li>
          </ul>
        )}
      </div>
    </div>
  );
};
