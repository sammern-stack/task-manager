import { useState } from "react";
import { useOpenBoardStore } from "../stores/openBoardStore";
import { useGetColumnsByBoardId } from "./useBoards";
import type { InputChangeEvent } from "@/shared/types/react.types";

export const useBoardDialog = (dialog: "create" | "update") => {
  const openBoard = useOpenBoardStore((s) => s.openBoard);
  const { data: columns } = useGetColumnsByBoardId(openBoard.id ?? "");

  const initialBoardName = dialog === "create" ? "" : openBoard.name;
  const initialBoardColumns =
    dialog === "update" && columns
      ? columns.data.map((column) => ({
          id: crypto.randomUUID(),
          name: column.name,
        }))
      : [{ id: crypto.randomUUID(), name: "Todo" }];

  const [boardName, setBoardName] = useState(initialBoardName);
  const [boardColumns, setBoardColumns] = useState(initialBoardColumns);

  const handleBoardName = (name: string) => setBoardName(name);

  const handleColumnChange = (e: InputChangeEvent, id: string) => {
    setBoardColumns((prev) =>
      prev.map((column) =>
        column.id === id ? { ...column, name: e.target.value } : column,
      ),
    );
  };

  const handleAddColumn = () => {
    setBoardColumns((prev) => [...prev, { id: crypto.randomUUID(), name: "" }]);
  };

  const handleRemoveColumn = (id: string) => {
    setBoardColumns((prev) => prev.filter((c) => c.id !== id));
  };

  return {
    boardName,
    boardColumns,
    setBoardName,
    setBoardColumns,
    handleBoardName,
    handleColumnChange,
    handleAddColumn,
    handleRemoveColumn,
  };
};
