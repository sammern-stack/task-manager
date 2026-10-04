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
import { EditingColumns } from "../../column/EditingColumns/EditingColumns";
import type { FormSubmitEvent } from "@/shared/types/react.types";

export const BoardUpdateDialog = () => {
  const { getError, setError } = useBoardError();
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

  const onUpdateBoard = (e: FormSubmitEvent) => {
    e.preventDefault();
    updateBoard(
      { name: board.name },
      {
        onSuccess: ({ message, data: { _id: boardId, name } }) => {
          setOpenBoard({ name });

          const toCreateColumns = buildCreateColumnsArray();
          if (toCreateColumns.length > 0)
            createColumns({ boardId, columns: toCreateColumns });

          const toUpdateColumns = buildUpdateColumnsArray();
          if (toUpdateColumns.length > 0)
            updateColumns({ boardId, columns: toUpdateColumns });

          const toDeleteColumns = buildDeleteColumnsArray();
          if (toDeleteColumns.length > 0)
            deleteColumns({ boardId, columnIds: toDeleteColumns });

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
          label="Board Name"
          placeholder="e.g. Web Design"
          value={board.name}
          onChange={(e) => setBoardName(e.target.value)}
          error={getError("boardName")}
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
