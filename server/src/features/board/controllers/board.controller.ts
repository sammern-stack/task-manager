import type { Request, Response } from "express";
import * as boardService from "../services/board.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { BoardCreateBody, BoardUpdateBody } from "../types/board.types.js";

export const getBoards = asyncHandler(async (_req: Request, res: Response) => {
  const boards = await boardService.getBoards();
  res.status(200).json({
    ok: true,
    message: "Boards fetched successfully",
    data: boards,
  });
});

export const getBoardById = asyncHandler(
  async (req: Request<{ boardId?: string }>, res: Response) => {
    const { boardId } = req.params;
    const board = await boardService.getBoardById(boardId!);
    res.status(200).json({
      ok: true,
      message: "Board fetched successfully",
      data: board,
    });
  },
);

export const createBoard = asyncHandler(
  async (req: Request<{}, {}, BoardCreateBody>, res: Response) => {
    const newBoard = await boardService.createBoard(req.body);
    res.status(201).json({
      ok: true,
      message: "Board created successfully",
      data: newBoard,
    });
  },
);

export const deleteBoard = asyncHandler(
  async (req: Request<{ boardId?: string }>, res: Response) => {
    const { boardId } = req.params;
    const board = await boardService.deleteBoard(boardId!);
    res.status(200).json({
      ok: true,
      message: `Board: ${board.name} deleted successfully`,
      data: board,
    });
  },
);

export const updateBoard = asyncHandler(
  async (
    req: Request<{ boardId?: string }, {}, BoardUpdateBody>,
    res: Response,
  ) => {
    const { boardId } = req.params;
    const board = await boardService.updateBoard(boardId!, req.body);
    res.status(200).json({
      ok: true,
      message: `Board: ${board.name} updated successfully`,
      data: board,
    });
  },
);
