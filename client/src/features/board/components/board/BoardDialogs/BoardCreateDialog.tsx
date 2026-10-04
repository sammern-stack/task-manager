import styles from "./BoardDialog.module.scss";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../../stores/openBoardStore";
import { useCreateBoard } from "../../../hooks/api/useBoards";
import { useCreateColumns } from "../../../hooks/api/useColumns";
import { Button, FormField } from "@/shared/components";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import { useBoardError } from "@/features/board/hooks/useBoardError";
import { EditingColumns } from "../../column/EditingColumns/EditingColumns";
import type { FormSubmitEvent } from "@/shared/types/react.types";
import { normalizeColumns } from "@/features/board/utils/normalizeColumns";

export const BoardCreateDialog = () => {
  const { getError, setError } = useBoardError();

  const { mutate: createBoard } = useCreateBoard();
  const { mutate: createColumns } = useCreateColumns();
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const board = useCurrentBoardStore((s) => s.board);
  const { setBoardName } = useCurrentBoardStore.getState();

  if (!board) return null;

  const onCreateBoard = (e: FormSubmitEvent) => {
    e.preventDefault();
    createBoard(
      { name: board.name },
      {
        onSuccess: ({ message, data: { _id: boardId, name } }) => {
          const normalizedColumns = normalizeColumns(board.columns);
          if (normalizedColumns.length > 0)
            createColumns({ boardId, columns: normalizedColumns });

          setOpenBoard({ id: boardId, name });
          closeDialog();
          addToast({ message, type: "success" });
        },
        onError: ({ message }) => setError("boardName", { message }),
      },
    );
  };

  return (
    <div className={styles.dialog}>
      <h2 className={styles.dialog__title}>Add New Board</h2>
      <form className={styles.dialog__form} onSubmit={onCreateBoard}>
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
          Create new Board
        </Button>
      </form>
    </div>
  );
};
