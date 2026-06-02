import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    fs: { allow: [path.resolve(__dirname, "..")] },
    port: 5174,
    open: true,
  },
});
