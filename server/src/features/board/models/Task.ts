import { Schema, model } from "mongoose";
import type {
  SubtaskSchema,
  TaskSchema,
  TaskModel,
  TaskStatics,
} from "../types/task.types.js";

const subtaskSchema = new Schema<SubtaskSchema>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const taskSchema = new Schema<TaskSchema, TaskModel, {}, {}, {}, TaskStatics>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name for the task is required"],
      minlength: [3, "name must be at least 3 characters"],
      maxlength: [100, "name can't be longer than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    subtasks: {
      type: [subtaskSchema],
      default: [],
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  { timestamps: true },
);

const Task = model<TaskSchema, TaskModel>("task", taskSchema);
export default Task;
