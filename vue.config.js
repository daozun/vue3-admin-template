const { defineConfig } = require("@vue/cli-service");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// elementplus 自动导入
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve("src"),
      },
      fallback: { path: require.resolve("path-browserify") },
    },
  },
  lintOnSave: false,
  devServer: {
    port: 4396,
    open: false,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        ws: false,
        target: "http://localhost:8889",
        changeOrigin: true,
      },
    },
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
});
