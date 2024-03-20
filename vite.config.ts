import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 8081,
    strictPort: true,
  },
  server: {
    port: 8081,
    strictPort: true,
    host: true,
    origin: "http://localhost:8081",
  },
});
