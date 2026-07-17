import styles from "./CreateBoardDialog.module.scss";
import { useState } from "react";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useCreateBoard } from "../../hooks/useBoards";
import { Button } from "@/shared/components";
import type {
  FormSubmitEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";

export const CreateBoardDialog = () => {
  const { mutate: createBoard } = useCreateBoard();
  const [newBoardName, setNewBoardName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);

  const handleFormSubmit = (e: FormSubmitEvent) => {
    e.preventDefault();
    createBoard(
      { name: newBoardName },
      {
        onSuccess: ({ message, data }) => {
          setOpenBoard({ id: data._id, name: data.name });
          closeDialog();
          addToast({ message, type: "success" });
        },
        onError: ({ message }) => setErrorMessage(message),
      },
    );
  };

  const handleInputChange = (e: InputChangeEvent) => {
    if (errorMessage) setErrorMessage(null);
    setNewBoardName(e.target.value);
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
          {errorMessage && (
            <span className={styles.createBoardDialog__nameError}>
              {errorMessage}
            </span>
          )}
          <input
            type="text"
            id="boardName"
            name="boardName"
            value={newBoardName}
            onChange={handleInputChange}
            placeholder="e.g. Web Design"
            autoComplete="off"
            className={[
              styles.createBoardDialog__input,
              errorMessage ? styles["createBoardDialog__input--error"] : "",
            ].join(" ")}
          />
          <span className={styles.createBoardDialog__helperText}>
            Optional - defaults to 'Untitled Board' if empty
          </span>
        </label>

        <Button type="submit" variant="primarySmall">
          Create New Board
        </Button>
      </form>
    </div>
  );
};
