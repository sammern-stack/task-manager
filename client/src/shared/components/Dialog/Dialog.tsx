import styles from "./Dialog.module.scss";
import { useDialogStore } from "@/shared/stores";
import {
  BoardCreateDialog,
  BoardUpdateDialog,
  TaskCreateDialog,
  TaskUpdateDialog,
  TaskView,
} from "@/features/board";
import { Confirm } from "../Confirm/Confirm";
import { RxCross1 } from "react-icons/rx";
import type { ColumnSchema } from "@/shared/types/column.types";

export const Dialog = () => {
  const { type, isOpen, payload } = useDialogStore((s) => s.dialog);
  const closeDialog = useDialogStore((s) => s.closeDialog);

  if (!isOpen) return null;

  const renderCloseBtn = () => {
    if (type === "taskView") return;
    return (
      <button
        type="button"
        className={styles.dialog__close}
        onClick={closeDialog}
        aria-label="Close dialog"
      >
        <RxCross1 />
      </button>
    );
  };

  return (
    <>
      <dialog className={styles.dialog} open>
        {renderCloseBtn()}
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
        {type === "updateTask" && (
          <TaskUpdateDialog taskId={payload?.taskId as string} />
        )}
        {type === "taskView" && (
          <TaskView
            taskId={payload?.taskId as string}
            column={payload?.column as ColumnSchema}
          />
        )}
      </dialog>
      <div className={styles.dialog__backdrop} onClick={closeDialog}></div>
    </>
  );
};
