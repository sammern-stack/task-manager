import type { Request, Response } from "express";
import * as columnService from "../services/column.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { ColumnCreateBody } from "../types/column.types.js";

export const getColumnsByBoardId = asyncHandler(
  async (req: Request<{ boardId?: string }>, res: Response) => {
    const { boardId } = req.params;
    const columns = await columnService.getColumnsByBoardId(boardId!);
    res.status(200).json({
      ok: true,
      message: "Columns fetched successfully",
      data: columns,
    });
  },
);

export const createColumn = asyncHandler(
  async (
    req: Request<{ boardId?: string }, {}, ColumnCreateBody>,
    res: Response,
  ) => {
    const { boardId } = req.params;
    const newColumn = await columnService.createColumn(req.body, boardId!);
    res.status(201).json({
      ok: true,
      message: "Column created successfully",
      data: newColumn,
    });
  },
);

export const createColumns = asyncHandler(
  async (
    req: Request<{ boardId?: string }, {}, { columns: ColumnCreateBody[] }>,
    res: Response,
  ) => {
    const { boardId } = req.params;
    const { columns } = req.body;
    const newColumns = await columnService.createColumns(columns, boardId!);
    res.status(201).json({
      ok: true,
      message: "Columns created successfully",
      data: newColumns,
    });
  },
);
