import styles from "./Dialog.module.scss";
import { useDialogStore } from "@/shared/stores";
import {
  BoardCreateDialog,
  BoardUpdateDialog,
  TaskCreateDialog,
} from "@/features/board";
import { Confirm } from "../Confirm/Confirm";
import { RxCross1 } from "react-icons/rx";

export const Dialog = () => {
  const { type, isOpen, payload } = useDialogStore((s) => s.dialog);
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
        {type === "createBoard" && <BoardCreateDialog />}
        {type === "deleteBoard" && (
          <Confirm
            title={payload?.title as string}
            description={payload?.description as string}
            onConfirm={payload?.onDelete as () => void}
          />
        )}
        {type === "updateBoard" && <BoardUpdateDialog />}
        {type === "createTask" && <TaskCreateDialog />}
      </dialog>
      <div className={styles.dialog__backdrop} onClick={closeDialog}></div>
    </>
  );
};
