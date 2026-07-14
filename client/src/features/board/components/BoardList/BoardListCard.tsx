import styles from "./BoardList.module.scss";
import { useEffect } from "react";
import { useOpenBoardStore } from "../../stores/openBoardStore";
import { useBoards } from "../../hooks/useBoards";
import BoardIcon from "@/assets/icon-board.svg?react";
import type { BoardSchema } from "@/shared/types/board.types";

type BoardListCardProps =
  | { variant: "board"; board: BoardSchema }
  | { variant: "createBtn" };

export const BoardListCard = (props: BoardListCardProps) => {
  const { data: boards } = useBoards();
  const openBoardId = useOpenBoardStore((s) => s.openBoardId);
  const setOpenBoardId = useOpenBoardStore((s) => s.setOpenBoardId);

  useEffect(() => {
    if (!boards?.data) return;
    if (boards.data.some((board) => openBoardId === board._id)) return;
    setOpenBoardId(boards.data[0]._id);
  }, [boards, openBoardId, setOpenBoardId]);

  const handleSelectBoard = () => {
    if (props.variant === "board") return setOpenBoardId(props.board._id);
    // Logic to create new board
  };

  const cardLabel =
    props.variant === "board" ? props.board.name : "+ Create New Board";

  const boardCardClasses = [
    styles.boardList__card,
    props.variant === "board" && openBoardId === props.board._id
      ? styles["boardList__card--active"]
      : "",
  ].join(" ");

  return (
    <div
      key={props.variant === "board" ? props.board._id : "createBtn"}
      className={boardCardClasses}
      onClick={handleSelectBoard}
    >
      <BoardIcon />
      <span>{cardLabel}</span>
    </div>
  );
};
