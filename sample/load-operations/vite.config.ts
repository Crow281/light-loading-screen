import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    base: "./",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                AwaitScriptExample: resolve(
                    __dirname,
                    "AwaitScriptExample.html",
                ),
            },
        },
    },
});
