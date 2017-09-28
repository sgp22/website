const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const { AotPlugin } = require("@ngtools/webpack");
const nodeModules = path.join(process.cwd(), "node_modules");
const { CommonsChunkPlugin } = require("webpack").optimize;

const ENV = process.env.NODE_ENV = process.env.ENV = "production";

module.exports = webpackMerge(commonConfig, {
  "module": {
    "rules": [
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack",
      }
    ]
  },
  "plugins": [
    new DefinePlugin({
      "process.env": {
        "ENV": JSON.stringify(ENV)
      }
    }),
    new AotPlugin({
      tsConfigPath: "src/tsconfig.json",
    }),
    new CommonsChunkPlugin({
      "name": "inline",
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": "vendor",
      "minChunks": (module) => module.resource && module.resource.startsWith(nodeModules),
      "chunks": [
        "main"
      ]
    }),
  ],
});