const CompressionWebpackPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const resolve = (dir) => require("path").join(__dirname, dir);
const { defineConfig } = require("@vue/cli-service");

process.env.VUE_APP_VERSION = Date.now();

module.exports = defineConfig({
  publicPath: "/",
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_API,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  productionSourceMap: false,
  configureWebpack: () => {
    const configNew = {};
    if (process.env.NODE_ENV === "production") {
      configNew.plugins = [
        // gzip
        new CompressionWebpackPlugin({
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
        new TerserPlugin({
          terserOptions: {
            ecma: undefined,
            warnings: false,
            parse: {},
            compress: {
              drop_console: true, // 清除 console 语句
              drop_debugger: false, // 清除 debugger 语句
              pure_funcs: ["console.log"], // 移除console
            },
          },
        }),
      ];
    }
    return configNew;
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch").delete("preload");
    // 重新设置 alias
    config.resolve.alias
      .set("api", resolve("src/api"))
      .set("components", resolve("src/components"))
      .set("assets", resolve("src/assets"))
      .set("mixins", resolve("src/mixins"))
      .set("views", resolve("src/views"))
      .set("store", resolve("src/store"))
      .set("plugin", resolve("src/plugin"))
      .set("libs", resolve("src/libs"))
      .set("layout", resolve("src/layout"))
      .set("util", resolve("src/util"))
      .set("config", resolve("src/config"))
      .set("layout", resolve("src/layout"))
      .set("router", resolve("src/router"));
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [resolve("src/assets/scss/var.scss")],
    },
  },
});
