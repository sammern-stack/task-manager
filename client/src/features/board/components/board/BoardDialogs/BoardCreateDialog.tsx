import styles from "./BoardDialog.module.scss";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../../stores/openBoardStore";
import { useCreateBoard } from "../../../hooks/api/useBoards";
import { useCreateColumns } from "../../../hooks/api/useColumns";
import { Button, FormField } from "@/shared/components";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import { useBoardError } from "@/features/board/hooks/useBoardError";
import type {
  FormSubmitEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";
import { EditingColumns } from "../../column/EditingColumns/EditingColumns";

export const BoardCreateDialog = () => {
  const { getError, setError, clearError } = useBoardError();

  const { mutate: createBoard } = useCreateBoard();
  const { mutate: createColumns } = useCreateColumns();
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const board = useCurrentBoardStore((s) => s.board);
  const { setBoardName } = useCurrentBoardStore.getState();

  if (!board) return null;

  const onBoardNameChange = (e: InputChangeEvent) => {
    if (getError("boardName")) clearError("boardName");
    setBoardName(e.target.value);
  };

  const onCreateBoard = (e: FormSubmitEvent) => {
    e.preventDefault();
    createBoard(
      { name: board.name },
      {
        onSuccess: ({ message, data }) => {
          const columnsToCreate = board.columns
            .map((col) => col.column.name)
            .filter((name) => name.length > 0)
            .map((name) => ({ name }));

          if (columnsToCreate.length > 0) {
            createColumns({ boardId: data._id, columns: columnsToCreate });
          }

          setOpenBoard({ id: data._id, name: data.name });
          closeDialog();
          addToast({ message, type: "success" });
        },
        onError: ({ message }) => {
          setError("boardName", { message });
        },
      },
    );
  };

  return (
    <div className={styles.dialog}>
      <h2 className={styles.dialog__title}>Add New Board</h2>
      <form className={styles.dialog__form} onSubmit={onCreateBoard}>
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
          Create new Board
        </Button>
      </form>
    </div>
  );
};
