import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import blogOgpManifest from "./vite-plugin-blog-ogp";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), blogOgpManifest()],
    server: {
        host: true,
        watch: {
            usePolling: true,
            interval: 100,
        },
        proxy: {
            "/note-api": {
                target: "https://note.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/note-api/, ""),
            },
        },
    },
});
