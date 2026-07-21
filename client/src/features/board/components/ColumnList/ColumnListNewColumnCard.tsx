import styles from "./ColumnList.module.scss";
import { useToastStore } from "@/shared/stores";
import { useCreateColumn } from "../../hooks/useBoards";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import type {
  FormSubmitEvent,
  InputChangeEvent,
} from "@/shared/types/react.types";
import { Button } from "@/shared/components";
import type { NewColumn } from "./ColumnList";

interface ColumnListNewColumnCardProps {
  newColumn: NewColumn | null;
  setNewColumn: React.Dispatch<React.SetStateAction<NewColumn | null>>;
}

export const ColumnListNewColumnCard = ({
  newColumn,
  setNewColumn,
}: ColumnListNewColumnCardProps) => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { mutate: createColumn } = useCreateColumn(openBoardId ?? "");
  const addToast = useToastStore((s) => s.addToast);

  const handleColumnName = (e: InputChangeEvent) => {
    if (!newColumn) return;
    setNewColumn({ ...newColumn, name: e.target.value });
  };
  const handleCancelNewColumn = () => setNewColumn(null);
  const handleSubmitNewColumn = (e: FormSubmitEvent) => {
    e.preventDefault();
    if (!newColumn) return;
    createColumn(
      { name: newColumn.name },
      {
        onSuccess: (data) => {
          setNewColumn(null);
          addToast({ message: data.message, type: "success" });
        },
      },
    );
  };

  if (!newColumn) return null;

  return (
    <form
      className={styles.columnList__column}
      onSubmit={handleSubmitNewColumn}
    >
      <input
        type="text"
        className={styles.columnList__columnAddInput}
        value={newColumn.name}
        onChange={handleColumnName}
        placeholder="New column's name"
      />
      <div className={styles.columnList__addColumnContent}>
        <div className={styles.columnList__columnOptions}></div>
        <div className={styles.columnList__columnActions}>
          <Button type="submit" variant="primarySmall">
            Create
          </Button>
          <Button variant="secondary" onClick={handleCancelNewColumn}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};
