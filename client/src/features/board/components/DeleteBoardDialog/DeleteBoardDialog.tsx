import styles from "./DeleteBoardDialog.module.scss";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useDeleteBoard } from "../../hooks/useBoards";
import { Button } from "@/shared/components";

export const DeleteBoardDialog = () => {
  const { mutate: deleteBoard } = useDeleteBoard();
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const openBoardName = useOpenBoardStore((s) => s.openBoard.name);
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);

  const handleDelete = () => {
    deleteBoard(openBoardId ?? "", {
      onSuccess: (data) => {
        addToast({ message: data.message, type: "success" });
        closeDialog();
      },
    });
  };

  const handleCancel = () => closeDialog();

  return (
    <div className={styles.deleteBoardDialog}>
      <h2 className={styles.deleteBoardDialog__title}>Delete this board?</h2>
      <p className={styles.deleteBoardDialog__description}>
        Are you sure you want to delete the "{openBoardName}" board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className={styles.deleteBoardDialog__actions}>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
