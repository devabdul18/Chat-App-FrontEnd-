import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://3941-106-219-159-160.ngrok-free.app",
        changeOrigin: true,
      },
    },
  },
});
