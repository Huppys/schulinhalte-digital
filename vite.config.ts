import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [vue()];

  if (command === "serve") {
    plugins.push(VueDevTools());
  }

  return {
    base: "/",
    appType: "spa",
    publicDir: "public",
    plugins: plugins,
    assetsInclude: ["assets/*"],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
