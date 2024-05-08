import { createHtmlPlugin } from "vite-plugin-html";
import { loadEnv } from "vite";

const getTarget = (mode, target) => {
  return loadEnv(mode, process.cwd())[target];
};

export default function setTitle (mode) {
  return createHtmlPlugin({
    minify: true,
    /**
     * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
     * @default src/main.ts
     */
    entry: "src/main.js",
    /**
     * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
     * @default index.html
     */
    template: "index.html",

    /**
     * Data that needs to be injected into the index.html ejs template
     */
    inject: {
      data: {
        // title: "VUE3-ADMIN-TEMPLATE",
        title: getTarget(mode, "VITE_APP_TITLE")
      },
    },
  });
}
