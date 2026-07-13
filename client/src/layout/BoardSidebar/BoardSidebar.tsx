import styles from "./BoardSidebar.module.scss";
import { useThemeStore } from "@/shared/stores";
import PageLogoDark from "@/assets/logo-dark.svg?react";
import PageLogoLight from "@/assets/logo-light.svg?react";
import LightThemeIcon from "@/assets/icon-light-theme.svg?react";
import DarkThemeIcon from "@/assets/icon-dark-theme.svg?react";
import HideSidebarIcon from "@/assets/icon-hide-sidebar.svg?react";

export const BoardSidebar = () => {
  const theme = useThemeStore((s) => s.theme);

  const handleToggleTheme = () => {
    useThemeStore.getState().toggleTheme();
  };

  return (
    <div className={styles.boardSidebar}>
      <div className={styles.boardSidebar__logo}>
        {theme === "light" ? <PageLogoDark /> : <PageLogoLight />}
      </div>
      <div className={styles.boardSidebar__boards}>
        <h2 className={styles.boardSidebar__boardsTitle}>
          All boards{" "}
          <span className={styles.boardSidebar__boardsCount}>(0)</span>
        </h2>
      </div>
      <div className={styles.boardSidebar__themeSwitch}>
        <LightThemeIcon />
        <input
          type="checkbox"
          className={styles.boardSidebar__themeInput}
          checked={theme === "light"}
          onChange={handleToggleTheme}
        />
        <DarkThemeIcon />
      </div>
      <div className={styles.boardSidebar__hideBtn}>
        <HideSidebarIcon />
        <span>Hide Sidebar</span>
      </div>
    </div>
  );
};
