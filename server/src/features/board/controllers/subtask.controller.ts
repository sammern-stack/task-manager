import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import * as subtaskService from "../services/subtask.service.js";
import type { Request, Response } from "express";
import type {
  CreateSubtasksBody,
  DeleteSubtasksBody,
  UpdateSubtasksBody,
} from "../types/task.types.js";

type ReqParams = { boardId?: string; columnId?: string; taskId?: string };

export const createSubtasks = asyncHandler(
  async (req: Request<ReqParams, {}, CreateSubtasksBody>, res: Response) => {
    const { boardId, columnId, taskId } = req.params;
    const task = await subtaskService.createSubtasks(
      boardId!,
      columnId!,
      taskId!,
      req.body,
    );
    res.status(201).json({
      ok: true,
      message: `subtasks created successfully for task with id ${task._id}`,
      data: task,
    });
  },
);

export const updateSubtasks = asyncHandler(
  async (req: Request<ReqParams, {}, UpdateSubtasksBody>, res: Response) => {
    const { boardId, columnId, taskId } = req.params;
    const task = await subtaskService.updateSubtasks(
      boardId!,
      columnId!,
      taskId!,
      req.body,
    );
    res.status(200).json({
      ok: true,
      message: `subtasks updated successfully for task with id ${task._id}`,
      data: task,
    });
  },
);

export const deleteSubtasks = asyncHandler(
  async (req: Request<ReqParams, {}, DeleteSubtasksBody>, res: Response) => {
    const { boardId, columnId, taskId } = req.params;
    const task = await subtaskService.deleteSubtasks(
      boardId!,
      columnId!,
      taskId!,
      req.body,
    );
    res.status(200).json({
      ok: true,
      message: `subtasks deleted successfully for task with id ${task._id}`,
      data: task,
    });
  },
);

export const toggleSubtask = asyncHandler(
  async (req: Request<ReqParams & { subtaskId?: string }>, res: Response) => {
    const { boardId, columnId, taskId, subtaskId } = req.params;
    const task = await subtaskService.toggleSubtask(
      boardId!,
      columnId!,
      taskId!,
      subtaskId!,
    );
    res.status(200).json({
      ok: true,
      message: `subtask toggled successfully for task with id ${task._id}`,
      data: task,
    });
  },
);
