import styles from "./Dialog.module.scss";
import { useDialogStore } from "@/shared/stores";
import { RxCross1 } from "react-icons/rx";

import { CreateBoardDialog, DeleteBoardDialog } from "@/features/board";

export const Dialog = () => {
  const isOpen = useDialogStore((s) => s.dialog.isOpen);
  const dialogType = useDialogStore((s) => s.dialog.type);
  const closeDialog = useDialogStore((s) => s.closeDialog);

  if (!isOpen) return null;

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
        {dialogType === "createBoard" && <CreateBoardDialog />}
        {dialogType === "deleteBoard" && <DeleteBoardDialog />}
      </dialog>
      <div className={styles.dialog__backdrop} onClick={closeDialog}></div>
    </>
  );
};
