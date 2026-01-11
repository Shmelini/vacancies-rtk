/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: "/vacancies-rtk/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/app/setupTests.ts",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/shared/color.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
