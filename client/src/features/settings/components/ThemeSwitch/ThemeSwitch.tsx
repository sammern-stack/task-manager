import styles from "./ThemeSwitch.module.scss";
import { useThemeStore } from "@/features/settings";

import LightThemeIcon from "@/assets/icon-light-theme.svg?react";
import DarkThemeIcon from "@/assets/icon-dark-theme.svg?react";

export const ThemeSwitch = () => {
  const theme = useThemeStore((s) => s.theme);
  const { toggleTheme } = useThemeStore.getState();

  return (
    <div className={styles.themeSwitch}>
      <LightThemeIcon />
      <input
        type="checkbox"
        className={styles.boardSidebar__themeInput}
        checked={theme === "light"}
        onChange={() => toggleTheme()}
      />
      <DarkThemeIcon />
    </div>
  );
};
