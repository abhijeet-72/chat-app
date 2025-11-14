import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // --- Add this 'server' block ---
  server: {
    port: 5173, // Keep the same port
    // proxy: {
    // Proxy /api requests to our backend
    // "/api": {
    // target: "http://localhost:5000",
    // changeOrigin: true, // Recommended for proxying
    // secure: false, // Not needed for http
    // },
    // },
  },
});
