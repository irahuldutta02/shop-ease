import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 3000,
    proxy: {
      // "/api": "http://localhost:5000", // for development
      "/api": "https://shop-ease-a7ya.onrender.com", // for production
    },
  },
});
