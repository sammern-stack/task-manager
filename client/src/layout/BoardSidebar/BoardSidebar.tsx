import styles from "./BoardSidebar.module.scss";
import { ThemeSwitch } from "@/features/settings";
import { PageLogo } from "@/shared/components";
import HideSidebarIcon from "@/assets/icon-hide-sidebar.svg?react";

export const BoardSidebar = () => {
  return (
    <div className={styles.boardSidebar}>
      <div className={styles.boardSidebar__logo}>
        <PageLogo />
      </div>
      <div className={styles.boardSidebar__boards}>
        <h2 className={styles.boardSidebar__boardsTitle}>
          All boards{" "}
          <span className={styles.boardSidebar__boardsCount}>(0)</span>
        </h2>
      </div>
      <ThemeSwitch />
      <div className={styles.boardSidebar__hideBtn}>
        <HideSidebarIcon />
        <span>Hide Sidebar</span>
      </div>
    </div>
  );
};
