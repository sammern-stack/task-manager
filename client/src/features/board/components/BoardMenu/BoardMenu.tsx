import styles from "./BoardMenu.module.scss";
import { useDialogStore } from "@/shared/stores";

export const BoardMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const handleEditBoard = () => {
    alert("Edit Board clicked");
    // Logic to handle editing a board
  };

  const handleDeleteBoard = async () => {
    useDialogStore.getState().openDialog("deleteBoard");
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
