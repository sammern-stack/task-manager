import styles from "./Sidebar.module.scss";
import { ThemeSwitch } from "@/features/settings";
import { Heading, Map, PageLogo } from "@/shared/components";
import {
  Board,
  CreateBoard,
  useBoards,
  useSelectFirstBoard,
} from "@/features/board";

import HideSidebarIcon from "@/assets/icon-hide-sidebar.svg?react";

export const Sidebar = () => {
  const { data: boards = [] } = useBoards();
  useSelectFirstBoard(boards);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__logo}>
        <PageLogo />
      </div>
      <div className={styles.sidebar__boardList}>
        <Heading size="h2">All boards ({boards.length})</Heading>
        <Map data={boards} render={(b) => <Board key={b._id} board={b} />} />
        <CreateBoard />
      </div>
      <ThemeSwitch />
      <div className={styles.sidebar__hideBtn}>
        <HideSidebarIcon />
        <span>Hide Sidebar</span>
      </div>
    </div>
  );
};
