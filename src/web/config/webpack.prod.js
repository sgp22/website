const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const nodeModules = path.join(process.cwd(), "node_modules");
const { CommonsChunkPlugin } = require("webpack").optimize;
const { AotPlugin } = require('@ngtools/webpack');

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
      "mainPath": "main.ts",
      "replaceExport": false,
      "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment.prod.ts"
      },
      "exclude": [],
      "tsConfigPath": "src/tsconfig.app.json",
      "skipCodeGeneration": true
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