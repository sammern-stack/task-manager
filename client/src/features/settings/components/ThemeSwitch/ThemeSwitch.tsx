import styles from "./ThemeSwitch.module.scss";
import { useThemeStore } from "@/shared/stores";
import LightThemeIcon from "@/assets/icon-light-theme.svg?react";
import DarkThemeIcon from "@/assets/icon-dark-theme.svg?react";

export const ThemeSwitch = () => {
  const theme = useThemeStore((s) => s.theme);
  const handleToggleTheme = () => {
    useThemeStore.getState().toggleTheme();
  };

  return (
    <div className={styles.themeSwitch}>
      <LightThemeIcon />
      <input
        type="checkbox"
        className={styles.boardSidebar__themeInput}
        checked={theme === "light"}
        onChange={handleToggleTheme}
      />
      <DarkThemeIcon />
    </div>
  );
};
