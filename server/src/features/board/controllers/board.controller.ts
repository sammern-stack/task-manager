import type { Request, Response } from "express";
import * as boardService from "../services/board.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";

import type { BoardCreateBody, BoardUpdateBody } from "../types/board.types.js";
import type {
  GetAllRequest,
  CreateRequest,
  DeleteRequest,
  UpdateRequest,
  GetOneRequest,
} from "@/shared/types/express.types.js";

export const getBoards = asyncHandler(
  async (_req: GetAllRequest, res: Response) => {
    const boards = await boardService.getAllBoards();
    res.status(200).json({
      ok: true,
      message: "Boards fetched successfully",
      data: boards,
      meta: {
        length: boards.length,
      },
    });
  },
);

export const getBoard = asyncHandler(
  async (req: GetOneRequest, res: Response) => {
    const board = await boardService.getBoardById(req.params.id!);
    res.status(200).json({
      ok: true,
      message: "Board fetched successfully",
      data: board,
    });
  },
);

export const createBoard = asyncHandler(
  async (req: CreateRequest<BoardCreateBody>, res: Response) => {
    const newBoard = await boardService.createNewBoard(req.body);
    res.status(201).json({
      ok: true,
      message: "Board created successfully",
      data: newBoard,
    });
  },
);

export const deleteBoard = asyncHandler(
  async (req: DeleteRequest, res: Response) => {
    const board = await boardService.deleteBoard(req.params.id!);
    res.status(200).json({
      ok: true,
      message: `Board: ${board.name} deleted successfully`,
      data: board,
    });
  },
);

export const updateBoard = asyncHandler(
  async (req: UpdateRequest<BoardUpdateBody>, res: Response) => {
    const board = await boardService.updateBoard(req.params.id!, req.body);
    res.status(200).json({
      ok: true,
      message: `Board: ${board.name} updated successfully`,
      data: board,
    });
  },
);
