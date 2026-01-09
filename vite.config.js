import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // 0.0.0.0 と同義
        watch: {
            usePolling: true, // ← これが最重要
            interval: 100, // お好み（100〜300）
        },
    },
});
