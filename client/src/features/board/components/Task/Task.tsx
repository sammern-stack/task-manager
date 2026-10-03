import type { TaskSchema } from "@/shared/types/task.types";
import styles from "./Task.module.scss";
import { Heading } from "@/shared/components";

interface TaskProps {
  task: TaskSchema;
}

export const Task = ({ task }: TaskProps) => {
  return (
    <div className={styles.task}>
      <Heading size="h2">{task.name}</Heading>
      <div className={styles.task__subtaskCount}>
        {task.subtasks.filter((subtask) => subtask.isCompleted).length}
        of
        {task.subtasks.length}
        subtasks
      </div>
    </div>
  );
};
