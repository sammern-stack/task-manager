import styles from "./Board.module.scss";
import { useDialogStore } from "@/shared/stores";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import { cls } from "@/shared/utils/formatters";

export const CreateBoard = () => {
  const openDialog = useDialogStore((s) => s.openDialog);
  const startCreateBoard = useCurrentBoardStore((s) => s.startCreateBoard);

  const handleCreateBoard = () => {
    startCreateBoard();
    openDialog("createBoard");
  };

  const classNames = cls(styles.board, styles["board--createBtn"]);

  return (
    <div className={classNames} onClick={handleCreateBoard}>
      + Create New Board
    </div>
  );
};
