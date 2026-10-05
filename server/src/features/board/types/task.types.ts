import type { HydratedDocument, Model, Types } from "mongoose";

export type SubtaskSchema = {
  name: string;
  isCompleted: boolean;
};

export type TaskSchema = {
  name: string;
  description: string;
  subtasks: Types.DocumentArray<SubtaskSchema>;
  boardId: Types.ObjectId;
  columnId: Types.ObjectId;
};

export type TaskDocument = HydratedDocument<TaskSchema>;

export type TaskStatics = {};

export interface TaskModel extends Model<TaskSchema>, TaskStatics {}

export type CreateTaskBody = Omit<TaskSchema, "boardId" | "subtasks"> & {
  subtasks: SubtaskSchema[];
};
export type UpdateTaskBody = Partial<Omit<TaskSchema, "boardId" | "subtasks">>;

export type CreateSubtasksBody = Omit<SubtaskSchema, "isCompleted">[];
export type UpdateSubtasksBody = {
  id: string;
  updates: Partial<Omit<SubtaskSchema, "isCompleted">>;
}[];
export type DeleteSubtasksBody = { id: string }[];
