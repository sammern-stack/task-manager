import styles from "./CreateBoardDialog.module.scss";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useCreateBoard, useCreateColumns } from "../../hooks/useBoards";
import { useBoardDialog } from "../../hooks/useBoardDialog";
import { Button } from "@/shared/components";
import CrossIcon from "@/assets/icon-cross.svg?react";
import type { FormSubmitEvent } from "@/shared/types/react.types";

export const CreateBoardDialog = () => {
  const {
    columnsContainerRef,
    boardColumns,
    boardName,
    error,
    setError,
    handleAddColumn,
    handleRemoveColumn,
    handleInputChange,
    handleColumnChange,
  } = useBoardDialog("create");
  const { mutate: createBoard } = useCreateBoard();
  const { mutate: createColumns } = useCreateColumns();
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);

  const handleFormSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    createBoard(
      { name: boardName },
      {
        onSuccess: ({ message, data }) => {
          const columnsToCreate = boardColumns
            .map((column) => column.name.trim())
            .filter((name) => name.length > 0)
            .map((name) => ({ name }));

          if (columnsToCreate.length > 0) {
            createColumns({
              boardId: data._id,
              columns: { columns: columnsToCreate },
            });
          }

          setOpenBoard({ id: data._id, name: data.name });
          closeDialog();
          addToast({ message, type: "success" });
        },
        onError: ({ message }) => setError(message),
      },
    );
  };

  return (
    <div className={styles.createBoardDialog}>
      <h2 className={styles.createBoardDialog__title}>Add New Board</h2>
      <form
        className={styles.createBoardDialog__form}
        onSubmit={handleFormSubmit}
      >
        <label
          htmlFor="boardName"
          className={styles.createBoardDialog__formLabel}
        >
          <span className={styles.createBoardDialog__formLabelText}>
            Board Name
          </span>
          {error && (
            <span className={styles.createBoardDialog__nameError}>{error}</span>
          )}
          <input
            type="text"
            id="boardName"
            name="boardName"
            value={boardName}
            onChange={handleInputChange}
            placeholder="e.g. Web Design"
            autoComplete="off"
            className={[
              styles.createBoardDialog__input,
              error ? styles["createBoardDialog__input--error"] : "",
            ].join(" ")}
          />
          <span className={styles.createBoardDialog__helperText}>
            Optional - defaults to 'Untitled Board' if empty
          </span>
        </label>

        <label
          htmlFor="boardColumns"
          className={styles.createBoardDialog__formLabel}
        >
          <span className={styles.createBoardDialog__formLabelText}>
            Board Columns
          </span>
          <div
            ref={columnsContainerRef}
            className={styles.createBoardDialog__columns}
          >
            {boardColumns.map((column) => (
              <div key={column.id} className={styles.createBoardDialog__column}>
                <input
                  className={styles.createBoardDialog__input}
                  value={column.name}
                  onChange={(e) => handleColumnChange(e, column.id)}
                  placeholder="e.g. Todos, Doing, etc."
                  autoComplete="off"
                />
                <div onClick={() => handleRemoveColumn(column.id)}>
                  <CrossIcon />
                </div>
              </div>
            ))}
          </div>
          <Button variant="secondary" onClick={handleAddColumn}>
            + Add New Column
          </Button>
        </label>

        <Button type="submit" variant="primarySmall">
          Create New Board
        </Button>
      </form>
    </div>
  );
};
