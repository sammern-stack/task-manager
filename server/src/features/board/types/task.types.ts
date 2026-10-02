import type { HydratedDocument, Model, Types } from "mongoose";

export type SubtaskSchema = {
  name: string;
  isCompleted: boolean;
};

export type TaskSchema = {
  name: string;
  description: string;
  subtasks: SubtaskSchema[];
  boardId: Types.ObjectId;
  columnId: Types.ObjectId;
};

export type TaskDocument = HydratedDocument<TaskSchema>;

export type TaskStatics = {};

export interface TaskModel extends Model<TaskSchema>, TaskStatics {}

export type CreateTaskBody = Omit<TaskSchema, "boardId">;

export type UpdateTaskBody = Partial<Omit<TaskSchema, "boardId" | "subtasks">>;
