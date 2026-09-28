import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () => {
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" }));
      },
    }),
    {
      name: "theme",
      partialize: (s) => ({
        theme: s.theme,
      }),
    },
  ),
);
