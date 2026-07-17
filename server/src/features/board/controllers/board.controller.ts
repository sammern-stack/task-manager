import type { Request, Response } from "express";
import * as boardService from "../services/board.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { BoardCreateBody, BoardUpdateBody } from "../types/board.types.js";

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
    res.status(201).json({
      ok: true,
      message: "Board created successfully",
      data: newBoard,
    });
  },
);

export const deleteBoard = asyncHandler(
  async (req: Request<{ id?: string }>, res: Response) => {
    const board = await boardService.deleteBoard(req.params.id!);
    res.status(200).json({
      ok: true,
      message: `Board: ${board.name} deleted successfully`,
      data: board,
    });
  },
);

export const updateBoard = asyncHandler(
  async (req: Request<{ id?: string }, {}, BoardUpdateBody>, res: Response) => {
    const board = await boardService.updateBoard(req.params.id!, req.body);
    res.status(200).json({
      ok: true,
      message: `Board: ${board.name} updated successfully`,
      data: board,
    });
  },
);
