import { useThemeStore } from "@/shared/stores";
import PageLogoDark from "@/assets/logo-dark.svg?react";
import PageLogoLight from "@/assets/logo-light.svg?react";

export const PageLogo = () => {
  const theme = useThemeStore((s) => s.theme);
  return theme === "light" ? <PageLogoDark /> : <PageLogoLight />;
};
