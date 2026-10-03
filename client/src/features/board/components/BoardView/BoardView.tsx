import styles from "./BoardView.module.scss";
import { Map } from "@/shared/components";
import { Column } from "../Column/Column";
import { CreateColumn } from "../CreateColumn/CreateColumn";
import type { ColumnSchema } from "@/shared/types/column.types";
import type { TaskSchema } from "@/shared/types/task.types";

interface BoardViewProps {
  columns: ColumnSchema[];
  tasks: TaskSchema[];
}

export const BoardView = ({ columns, tasks }: BoardViewProps) => {
  return (
    <div className={styles.columns}>
      <Map
        data={columns}
        render={(column) => (
          <Column
            key={column._id}
            column={column}
            tasks={tasks.filter((task) => task.columnId === column._id)}
          />
        )}
      />
      <CreateColumn />
    </div>
  );
};
