import type { Request, Response } from "express";
import * as boardService from "../services/board.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { BoardCreateBody } from "../types/board.types.js";

export const getBoards = asyncHandler(async (_req: Request, res: Response) => {
  const boards = await boardService.getAllBoards();
  res.status(200).json({
    ok: true,
    message: "Board fetched successfully",
    data: boards,
    meta: {
      length: boards.length,
    },
  });
});

export const createBoard = asyncHandler(
  async (req: Request<{}, {}, BoardCreateBody>, res: Response) => {
    const newBoard = await boardService.createNewBoard(req.body);
    res.status(204).json({
      ok: true,
      message: "Board created successfully",
      data: newBoard,
    });
  },
);
