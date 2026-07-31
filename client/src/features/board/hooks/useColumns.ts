import { useMutation } from "@tanstack/react-query";
import { columnApi } from "../services/columnApi";
import type { ColumnSchema } from "@/shared/types/column.types";

export const useUpdateColumn = (columnId: string, updates: ColumnSchema) => {
  return useMutation({
    mutationFn: () => columnApi.update(columnId, updates),
  });
};

export const useUpdateColumns = (
  columnIds: string[],
  updates: ColumnSchema[],
) => {
  return useMutation({
    mutationFn: () => columnApi.updateMany(columnIds, updates),
  });
};

export const useDeleteColumn = (columnId: string) => {
  return useMutation({
    mutationFn: () => columnApi.delete(columnId),
  });
};

export const useDeleteColumns = (columnIds: string[]) => {
  return useMutation({
    mutationFn: () => columnApi.deleteMany(columnIds),
  });
};
