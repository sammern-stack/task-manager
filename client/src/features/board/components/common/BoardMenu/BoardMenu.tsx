import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import styles from "./BoardMenu.module.scss";
import { useDialogStore } from "@/shared/stores";
import { useOpenBoardStore } from "@/features/board/stores/openBoardStore";
import { useGetColumnsByBoardId } from "@/features/board/hooks/useBoards";

export const BoardMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const openDialog = useDialogStore.getState().openDialog;
  const startUpdateBoard = useCurrentBoardStore((s) => s.startUpdateBoard);
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const openBoardName = useOpenBoardStore((s) => s.openBoard.name);
  const { data: columns } = useGetColumnsByBoardId(openBoardId ?? "");

  const handleEditBoard = () => {
    if (!columns?.data) return;
    startUpdateBoard(openBoardName, columns.data);
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
