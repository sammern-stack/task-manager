import styles from "./BoardMenu.module.scss";
import { useDeleteBoard } from "../../hooks/useBoards";
import { useOpenBoardStore } from "../../stores/openBoardStore";

export const BoardMenu = () => {
  const { mutate: deleteBoard } = useDeleteBoard();
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);

  const handleEditBoard = () => {
    alert("Edit Board clicked");
    // Logic to handle editing a board
  };

  const handleDeleteBoard = async () => {
    deleteBoard(openBoardId ?? "", {
      onSuccess: (data) => console.log("Board deleted successfully:", data),
    });
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
