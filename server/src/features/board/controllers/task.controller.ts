import type { Request, Response } from "express";
import * as taskService from "../services/task.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { CreateTaskBody, UpdateTaskBody } from "../types/task.types.js";

export const getTasksByBoardId = asyncHandler(
  async (req: Request<{ boardId?: string }>, res: Response) => {
    const { boardId } = req.params;
    const tasks = await taskService.getTasksByBoardId(boardId!);
    res.status(200).json({
      ok: true,
      message: `Tasks for board ${boardId} fetched successfully`,
      data: tasks,
    });
  },
);

export const getTaskById = asyncHandler(
  async (
    req: Request<{ boardId?: string; taskId?: string }>,
    res: Response,
  ) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.getTaskById(boardId!, taskId!);
    res.status(200).json({
      ok: true,
      message: `Task with id ${task._id} fetched successfully`,
      data: task,
    });
  },
);

export const createTask = asyncHandler(
  async (
    req: Request<{ boardId?: string; columnId?: string }, {}, CreateTaskBody>,
    res: Response,
  ) => {
    const { boardId, columnId } = req.params;
    const task = await taskService.createTask(boardId!, columnId!, req.body);
    res.status(201).json({
      ok: true,
      message: "Task created successfully",
      data: task,
    });
  },
);

export const updateTask = asyncHandler(
  async (
    req: Request<{ boardId?: string; taskId?: string }, {}, UpdateTaskBody>,
    res: Response,
  ) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.updateTask(boardId!, taskId!, req.body);
    res.status(200).json({
      ok: true,
      message: `Task with id ${task._id} updated successfully`,
      data: task,
    });
  },
);

export const deleteTask = asyncHandler(
  async (
    req: Request<{ boardId?: string; taskId?: string }>,
    res: Response,
  ) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.deleteTask(boardId!, taskId!);
    res.status(200).json({
      ok: true,
      message: `Task with id ${task._id} deleted successfully`,
      data: task,
    });
  },
);
