export type SubtaskSchema = {
  _id: string;
  name: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TaskSchema = {
  _id: string;
  name: string;
  description: string;
  subtasks: SubtaskSchema[];
  boardId: string;
  columnId: string;
  createdAt: string;
  updatedAt: string;
};

export type Subtask = Omit<SubtaskSchema, "_id" | "createdAt" | "updatedAt">;
export type Task = Omit<TaskSchema, "_id" | "createdAt" | "updatedAt">;

export type CreateTaskBody = Omit<Task, "boardId" | "subtasks"> & {
  subtasks: CreateSubtaskBody[];
};
export type UpdateTaskBody = Partial<Omit<Task, "boardId" | "subtasks">>;

export type CreateSubtaskBody = Omit<Subtask, "isCompleted">;
export type UpdateSubtaskBody = {
  id: string;
  updates: Partial<Omit<Subtask, "isCompleted">>;
};
export type DeleteSubtaskBody = { id: string };
