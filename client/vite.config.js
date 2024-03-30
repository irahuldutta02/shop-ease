import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ENV } from "./config/server.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api":
        ENV === "development"
          ? "http://localhost:5000"
          : "https://shop-ease-a7ya.onrender.com",
    },
  },
});
