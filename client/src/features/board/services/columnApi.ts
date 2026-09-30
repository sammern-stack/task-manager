import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";
import { BASE_URL } from "./boardApi";
import type {
  BulkUpdateColumnsBody,
  ColumnSchema,
  CreateColumnBody,
} from "@/shared/types/column.types";

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
