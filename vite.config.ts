import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,

    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],

          router: ["react-router-dom"],

          "ui-vendor": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],

          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],

          "query-vendor": ["@tanstack/react-query"],

          charts: ["recharts"],

          utils: [
            "clsx",
            "class-variance-authority",
            "tailwind-merge",
            "date-fns",
            "lucide-react",
          ],
        },
      },
    },

    target: "es2020",
    minify: "esbuild",

    chunkSizeWarningLimit: 1000,
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@tanstack/react-query",
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
}));
