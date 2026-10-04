import styles from "./BoardDialog.module.scss";
import { Button, FormField } from "@/shared/components";
import { useBoardError } from "@/features/board/hooks/useBoardError";
import {
  useUpdateBoard,
  useCreateColumns,
  useDeleteColumns,
  useUpdateColumns,
} from "@/features/board";
import { useOpenBoardStore } from "@/features/board/stores/openBoardStore";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import type {
  FormSubmitEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";
import { EditingColumns } from "../../column/EditingColumns/EditingColumns";

export const BoardUpdateDialog = () => {
  const { getError, setError, clearError } = useBoardError();
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { mutate: updateBoard } = useUpdateBoard(openBoardId);
  const { mutate: createColumns } = useCreateColumns();
  const { mutate: updateColumns } = useUpdateColumns();
  const { mutate: deleteColumns } = useDeleteColumns();
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const board = useCurrentBoardStore((s) => s.board);
  const {
    setBoardName,
    buildCreateColumnsArray,
    buildUpdateColumnsArray,
    buildDeleteColumnsArray,
  } = useCurrentBoardStore.getState();

  if (!board) return null;

  const onBoardNameChange = (e: InputChangeEvent) => {
    if (getError("boardName")) clearError("boardName");
    setBoardName(e.target.value);
  };

  const onUpdateBoard = (e: FormSubmitEvent) => {
    e.preventDefault();
    updateBoard(
      { name: board.name },
      {
        onSuccess: ({ message, data: board }) => {
          const boardId = board._id;
          setOpenBoard({ name: board.name });
          createColumns({ boardId, columns: buildCreateColumnsArray() });
          updateColumns({ boardId, columns: buildUpdateColumnsArray() });
          deleteColumns({ boardId, columnIds: buildDeleteColumnsArray() });
          addToast({ message, type: "success" });
          closeDialog();
        },
        onError: ({ message }) => setError("boardName", { message }),
      },
    );
  };
  return (
    <div className={styles.dialog}>
      <h2 className={styles.dialog__title}>Update Board</h2>
      <form className={styles.dialog__form} onSubmit={onUpdateBoard}>
        <FormField
          id="boardName"
          label="Board Name"
          placeholder="e.g. Web Design"
          error={getError("boardName")}
          handleValue={[board.name, onBoardNameChange]}
          helperText="Optional - defaults to 'Untitled Board' if empty"
        />
        <EditingColumns columns={board.columns} />
        <Button type="submit" variant="primarySmall">
          Save Changes
        </Button>
      </form>
    </div>
  );
};
