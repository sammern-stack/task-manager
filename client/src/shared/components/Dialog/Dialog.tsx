import styles from "./Dialog.module.scss";
import { useDialogStore } from "@/shared/stores";
import { RxCross1 } from "react-icons/rx";

import {
  BoardCreateDialog,
  BoardUpdateDialog,
  DeleteBoardDialog,
} from "@/features/board";

export const Dialog = () => {
  const dialog = useDialogStore((s) => s.dialog);
  const closeDialog = useDialogStore((s) => s.closeDialog);

  if (!dialog.isOpen) return null;

  return (
    <>
      <dialog className={styles.dialog} open>
        <button
          type="button"
          className={styles.dialog__close}
          onClick={closeDialog}
          aria-label="Close dialog"
        >
          <RxCross1 />
        </button>
        {dialog.type === "createBoard" && <BoardCreateDialog />}
        {dialog.type === "deleteBoard" && <DeleteBoardDialog />}
        {dialog.type === "updateBoard" && <BoardUpdateDialog />}
      </dialog>
      <div className={styles.dialog__backdrop} onClick={closeDialog}></div>
    </>
  );
};
