import styles from "./UpdateBoardDialog.module.scss";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useUpdateBoard } from "../../hooks/useBoards";
import { Button } from "@/shared/components";
import type { FormSubmitEvent } from "@/shared/types/react.types";
import CrossIcon from "@/assets/icon-cross.svg?react";
import { useBoardDialog } from "../../hooks/useBoardDialog";

export const UpdateBoardDialog = () => {
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
  } = useBoardDialog("update");
  const openBoard = useOpenBoardStore((s) => s.openBoard);
  const setOpenBoardName = useOpenBoardStore((s) => s.setOpenBoardName);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);
  const { mutate: updateBoard } = useUpdateBoard(openBoard.id ?? "");

  const handleFormSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    updateBoard(
      { name: boardName },
      {
        onSuccess: ({ message, data }) => {
          closeDialog();
          addToast({ message, type: "success" });
          setOpenBoardName(data.name);
        },
        onError: ({ message }) => setError(message),
      },
    );
  };

  return (
    <div className={styles.updateBoardDialog}>
      <h2 className={styles.updateBoardDialog__title}>Edit Board</h2>
      <form
        className={styles.updateBoardDialog__form}
        onSubmit={handleFormSubmit}
      >
        <label
          htmlFor="boardName"
          className={styles.updateBoardDialog__boardNameLabel}
        >
          <span className={styles.updateBoardDialog__boardNameLabelText}>
            Board Name
          </span>
          {error && (
            <span className={styles.updateBoardDialog__nameError}>{error}</span>
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
              styles.updateBoardDialog__input,
              error ? styles["updateBoardDialog__input--error"] : "",
            ].join(" ")}
          />
          <span className={styles.updateBoardDialog__helperText}>
            Optional - defaults to 'Untitled Board' if empty
          </span>
        </label>

        <label
          htmlFor="boardColumns"
          className={styles.updateBoardDialog__formLabel}
        >
          <span className={styles.updateBoardDialog__formLabelText}>
            Board Columns
          </span>
          <div
            ref={columnsContainerRef}
            className={styles.updateBoardDialog__columns}
          >
            {boardColumns.map((column) => (
              <div key={column.id} className={styles.updateBoardDialog__column}>
                <input
                  className={styles.updateBoardDialog__input}
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
          Save Changes
        </Button>
      </form>
    </div>
  );
};
