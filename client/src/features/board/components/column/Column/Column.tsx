import styles from "./Column.module.scss";
import { Heading, Map } from "@/shared/components";
import type { ColumnSchema } from "@/shared/types/column.types";
import type { TaskSchema } from "@/shared/types/task.types";
import { Task } from "../../task/Task/Task";

interface ColumnProps {
  column: ColumnSchema;
  tasks: TaskSchema[];
}

export const Column = ({ column, tasks }: ColumnProps) => {
  return (
    <div className={styles.column}>
      <Heading size="h2" className={styles.column__name}>
        {column.name} ({tasks.length})
      </Heading>
      <div className={styles.column__tasks}>
        <Map
          data={tasks}
          render={(task) => <Task key={task._id} task={task} column={column} />}
        />
      </div>
    </div>
  );
};
