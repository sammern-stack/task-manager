import styles from "./CreateBoardDialog.module.scss";
import { useState } from "react";
import { useDialogStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useCreateBoard } from "../../hooks/useBoards";
import type { FormSubmitEvent } from "@/shared/types/react.types";

export const CreateBoardDialog = () => {
  const { mutate: createBoard } = useCreateBoard();
  const [boardName, setBoardName] = useState("");
  const setOpenBoardId = useOpenBoardStore((s) => s.setOpenBoardId);
  const setOpenBoardName = useOpenBoardStore((s) => s.setOpenBoardName);
  const closeDialog = useDialogStore((s) => s.closeDialog);

  const handleFormSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    createBoard(
      { name: boardName },
      {
        onSuccess: (newBoard) => {
          setOpenBoardId(newBoard.data._id);
          setOpenBoardName(newBoard.data.name);
          closeDialog();
        },
        onError: (error) => {
          console.log(error.message);
        },
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
          className={styles.createBoardDialog__boardNameLabel}
        >
          <span className={styles.createBoardDialog__boardNameLabelText}>
            Board Name
          </span>
          <input
            type="text"
            id="boardName"
            name="boardName"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="e.g. Web Design"
            autoComplete="off"
            className={styles.createBoardDialog__input}
          />
          <span className={styles.createBoardDialog__helperText}>
            Optional - defaults to 'Untitled Board' if empty
          </span>
        </label>

        <button type="submit" className={styles.createBoardDialog__submit}>
          Create New Board
        </button>
      </form>
    </div>
  );
};
