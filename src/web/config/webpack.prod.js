const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const { AngularCompilerPlugin } = require('@ngtools/webpack');
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
      "ENV": JSON.stringify(ENV) || "production",
      "process.env": {
        "ENV": JSON.stringify(ENV) || "production"
      }
    }),
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "sourceMap": false,
      "tsConfigPath": "src/tsconfig.app.json",
      "compilerOptions": {}
    })
  ]
});
