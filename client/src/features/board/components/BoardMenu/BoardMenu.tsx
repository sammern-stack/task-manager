import styles from "./BoardMenu.module.scss";
import { useToastStore } from "@/shared/stores/toastStore";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useDeleteBoard } from "../../hooks/useBoards";

export const BoardMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const { mutate: deleteBoard } = useDeleteBoard();
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const addToast = useToastStore((s) => s.addToast);

  const handleEditBoard = () => {
    alert("Edit Board clicked");
    // Logic to handle editing a board
  };

  const handleDeleteBoard = async () => {
    deleteBoard(openBoardId ?? "", {
      onSuccess: (data) => {
        addToast({
          message: data.message,
          type: "error",
        });
        closeMenu();
      },
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
