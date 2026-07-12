import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
    preprocessorOptions: {
      scss: {
        additionalData: (src: string, filename: string) => {
          const normalized = filename.replace(/\\/g, "/");
          const shouldExclude = normalized.includes("/shared/styles");

          if (shouldExclude) return src;
          return `@use "@/shared/styles/mixins" as *;\n${src}`;
        },
      },
    },
  },
});
