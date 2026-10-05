import styles from "./Task.module.scss";
import { useDialogStore } from "@/shared/stores";
import type { TaskSchema } from "@/shared/types/task.types";

interface TaskProps {
  task: TaskSchema;
}

export const Task = ({ task }: TaskProps) => {
  const openDialog = useDialogStore((s) => s.openDialog);

  const handleOpenTask = () => openDialog("taskView");

  return (
    <button className={styles.task} onClick={handleOpenTask}>
      <h2 className={styles.task__name}>{task.name}</h2>
      <div className={styles.task__subtaskCount}>
        <span>
          {task.subtasks.filter((subtask) => subtask.isCompleted).length}
        </span>
        <span>of</span>
        <span>{task.subtasks.length}</span>
        <span>subtasks</span>
      </div>
    </button>
  );
};
