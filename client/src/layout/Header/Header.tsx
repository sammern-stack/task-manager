import styles from "./Header.module.scss";
import { useHeader } from "./useHeader";
import { useDropdown } from "@/shared/hooks/useDropdown";
import { Button } from "@/shared/components";
import { useDialogStore } from "@/shared/stores";
import VerticalEllipsisIcon from "@/assets/icon-vertical-ellipsis.svg?react";
import { useTaskFormStore } from "@/features/board/stores/taskFormStore";

export const Header = () => {
  const { dropdownRef, openDropdown, toggle } = useDropdown();
  const { onEditBoard, onDeleteBoard, boardName } = useHeader();
  const openDialog = useDialogStore((s) => s.openDialog);
  const startCreateTask = useTaskFormStore((s) => s.startCreateTask);

  const handleCreateTask = () => {
    startCreateTask();
    openDialog("createTask");
  };
  const handleEditBoard = () => (onEditBoard(), toggle());
  const handleDeleteBoard = () => (onDeleteBoard(), toggle());

  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>{boardName}</h1>
      <Button onClick={handleCreateTask}>+ Add New Task</Button>
      <div className={styles.header__boardDropdown} ref={dropdownRef}>
        <button className={styles.header__boardToggle} onClick={toggle}>
          <VerticalEllipsisIcon />
        </button>

        {openDropdown && (
          <ul className={styles.header__boardMenu}>
            <li onClick={handleEditBoard}>Edit Board</li>
            <li onClick={handleDeleteBoard}>Delete Board</li>
          </ul>
        )}
      </div>
    </div>
  );
};
