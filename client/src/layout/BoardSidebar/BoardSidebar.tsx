import styles from "./BoardSidebar.module.scss";
import { ThemeSwitch } from "@/features/settings";
import { BoardList } from "@/features/board";
import { PageLogo } from "@/shared/components";
import HideSidebarIcon from "@/assets/icon-hide-sidebar.svg?react";

export const BoardSidebar = () => {
  return (
    <div className={styles.boardSidebar}>
      <div className={styles.boardSidebar__logo}>
        <PageLogo />
      </div>
      <BoardList />
      <ThemeSwitch />
      <div className={styles.boardSidebar__hideBtn}>
        <HideSidebarIcon />
        <span>Hide Sidebar</span>
      </div>
    </div>
  );
};
