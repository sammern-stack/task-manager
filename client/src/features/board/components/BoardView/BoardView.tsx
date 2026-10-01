import styles from "./BoardView.module.scss";
import { Map } from "@/shared/components";
import { Column } from "../Column/Column";
import { CreateColumn } from "../CreateColumn/CreateColumn";
import type { ColumnSchema } from "@/shared/types/column.types";

interface BoardViewProps {
  columns: ColumnSchema[];
}

export const BoardView = ({ columns }: BoardViewProps) => {
  return (
    <div className={styles.columns}>
      <Map data={columns} render={(c) => <Column key={c._id} column={c} />} />
      <CreateColumn />
    </div>
  );
};
