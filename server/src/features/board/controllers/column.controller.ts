import type { Request, Response } from "express";
import * as columnService from "../services/column.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type {
  ColumnCreateBody,
  ColumnUpdateBody,
} from "../types/column.types.js";

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

export const updateColumn = asyncHandler(
  async (
    req: Request<{ columnId?: string }, {}, { updates: ColumnUpdateBody }>,
    res: Response,
  ) => {
    const { columnId } = req.params;
    const { updates } = req.body;
    const updatedColumn = await columnService.updateColumn(columnId!, updates);
    res.status(200).json({
      ok: true,
      message: "Column updated successfully",
      data: updatedColumn,
    });
  },
);

export const updateColumns = asyncHandler(
  async (
    req: Request<{}, {}, { columnIds: string[]; updates: ColumnUpdateBody[] }>,
    res: Response,
  ) => {
    const { columnIds, updates } = req.body;
    const updatedColumns = await columnService.updateColumns(
      columnIds,
      updates,
    );
    res.status(200).json({
      ok: true,
      message: "Columns updated successfully",
      data: updatedColumns,
    });
  },
);

export const deleteColumn = asyncHandler(
  async (req: Request<{ columnId?: string }>, res: Response) => {
    const { columnId } = req.params;
    await columnService.deleteColumn(columnId!);
    res.status(200).json({
      ok: true,
      message: "Column deleted successfully",
    });
  },
);

export const deleteColumns = asyncHandler(
  async (req: Request<{}, {}, { columnIds: string[] }>, res: Response) => {
    const { columnIds } = req.body;
    await columnService.deleteColumns(columnIds);
    res.status(200).json({
      ok: true,
      message: "Columns deleted successfully",
    });
  },
);
