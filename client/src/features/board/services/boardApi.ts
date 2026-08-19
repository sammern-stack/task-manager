import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";
import type {
  BoardSchema,
  BoardCreateBody,
  BoardUpdateBody,
} from "@/shared/types/board.types";
import type {
  ColumnSchema,
  CreateColumnBody,
  BulkUpdateColumnsBody,
} from "@/shared/types/column.types";

const BASE_URL = "/api/boards";

export const getBoardsReq = () => {
  const api = axios({ url: BASE_URL, method: "GET" });
  return requestHandler<BoardSchema[]>(() => api)();
};

export const getBoardReq = (boardId: string) => {
  const api = axios({ url: `${BASE_URL}/${boardId}`, method: "GET" });
  return requestHandler<BoardSchema>(() => api)();
};

export const createBoardReq = (board: BoardCreateBody) => {
  const api = axios({ url: BASE_URL, method: "POST", data: board });
  return requestHandler<BoardSchema>(() => api)();
};

export const updateBoardReq = (boardId: string, updates: BoardUpdateBody) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}`,
    method: "PUT",
    data: updates,
  });
  return requestHandler<BoardSchema>(() => api)();
};

export const deleteBoardReq = (boardId: string) => {
  const api = axios({ url: `${BASE_URL}/${boardId}`, method: "DELETE" });
  return requestHandler<BoardSchema>(() => api)();
};

export const getColumnsReq = (boardId: string) => {
  const api = axios({ url: `${BASE_URL}/${boardId}/columns`, method: "GET" });
  return requestHandler<ColumnSchema[]>(() => api)();
};

export const createColumnReq = (boardId: string, column: CreateColumnBody) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}/columns`,
    method: "POST",
    data: column,
  });
  return requestHandler<ColumnSchema>(() => api)();
};

export const createColumnsReq = (
  boardId: string,
  columns: CreateColumnBody[],
) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}/columns/bulk`,
    method: "POST",
    data: { columns },
  });
  return requestHandler<ColumnSchema[]>(() => api)();
};

export const updateColumnsReq = (
  boardId: string,
  columns: BulkUpdateColumnsBody[],
) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}/columns/bulk`,
    method: "PUT",
    data: { columns },
  });
  return requestHandler<ColumnSchema[]>(() => api)();
};

export const deleteColumnsReq = (boardId: string, columnIds: string[]) => {
  const api = axios({
    url: `${BASE_URL}/${boardId}/columns/bulk`,
    method: "DELETE",
    data: { columnIds },
  });
  return requestHandler<void>(() => api)();
};
