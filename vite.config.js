import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./src/view/",
  build: {
    sourcemap: true,
  },
  plugins: [reactRefresh()],
});
