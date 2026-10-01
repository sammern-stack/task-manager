import styles from "./BoardDialog.module.scss";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useCreateBoard } from "../../hooks/useBoards";
import { useCreateColumns } from "../../hooks/useColumns";
import { Button, FormField, Map } from "@/shared/components";
import { useCurrentBoardStore } from "@/features/board/stores/currentBoardStore";
import { useBoardError } from "@/features/board/hooks/useBoardError";
import type {
  FormSubmitEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";
import { useScrollToBottom } from "@/features/board/hooks/useScrollToBottom";
import { ColumnField } from "../ColumnField/ColumnField";

export const BoardCreateDialog = () => {
  const { getError, setError, clearError } = useBoardError();

  const { mutate: createBoard } = useCreateBoard();
  const { mutate: createColumns } = useCreateColumns();
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const board = useCurrentBoardStore((s) => s.board);
  const columnsLength = board?.columns.length ?? 0;
  const { containerRef, enableScroll } = useScrollToBottom(columnsLength);
  const { addColumn, setBoardName } = useCurrentBoardStore.getState();

  if (!board) return null;

  const onAddColumn = () => (enableScroll(), addColumn());

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
        <div className={styles.dialog__columns}>
          <span className={styles.dialog__title}>Board Columns</span>
          <div ref={containerRef} className={styles.dialog__columnsList}>
            <Map
              data={board.columns}
              render={(c) => <ColumnField key={c.id} column={c} />}
            />
          </div>
          <Button variant="secondary" onClick={onAddColumn}>
            + Add New Column
          </Button>
        </div>
        <Button type="submit" variant="primarySmall">
          Create new Board
        </Button>
      </form>
    </div>
  );
};
