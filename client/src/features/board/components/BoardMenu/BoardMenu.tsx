import styles from "./BoardMenu.module.scss";
import { useDialogStore } from "@/shared/stores";

export const BoardMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const openDialog = useDialogStore.getState().openDialog;

  const handleEditBoard = () => {
    openDialog("updateBoard");
    closeMenu();
  };

  const handleDeleteBoard = async () => {
    openDialog("deleteBoard");
    closeMenu();
  };

  return (
    <ul className={styles.boardMenu}>
      <li className={styles.boardMenu__action} onClick={handleEditBoard}>
        Edit Board
      </li>
      <li className={styles.boardMenu__action} onClick={handleDeleteBoard}>
        Delete Board
      </li>
    </ul>
  );
};
