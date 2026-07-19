import styles from "./CreateBoardDialog.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDialogStore, useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useCreateBoard } from "../../hooks/useBoards";
import { Button } from "@/shared/components";
import type {
  FormSubmitEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";
import type { ColumnCreateBody } from "@/shared/types/column.types";
import CrossIcon from "@/assets/icon-cross.svg?react";

type Columns = ({ id: string } & ColumnCreateBody)[];

export const CreateBoardDialog = () => {
  const { mutate: createBoard } = useCreateBoard();
  const [newBoardName, setNewBoardName] = useState("");
  const [columns, setColumns] = useState<Columns>([
    { id: crypto.randomUUID(), name: "Todo" },
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const shouldScrollToBottomRef = useRef(false);
  const columnsContainerRef = useRef<HTMLDivElement | null>(null);
  const setOpenBoard = useOpenBoardStore((s) => s.setOpenBoard);
  const closeDialog = useDialogStore((s) => s.closeDialog);
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    if (!shouldScrollToBottomRef.current) return;

    const container = columnsContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

    shouldScrollToBottomRef.current = false;
  }, [columns.length]);

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

  const handleAddColumn = () => {
    shouldScrollToBottomRef.current = true;
    setColumns((prev) => [...prev, { id: crypto.randomUUID(), name: "" }]);
  };

  const handleRemoveColumn = (id: string) => {
    setColumns((prev) => prev.filter((c) => c.id !== id));
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
            {columns.map((column) => (
              <div key={column.id} className={styles.createBoardDialog__column}>
                <input
                  value={column.name}
                  className={styles.createBoardDialog__input}
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
