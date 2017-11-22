const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const { AngularCompilerPlugin } = require('@ngtools/webpack');

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
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "sourceMap": false,
      "tsConfigPath": "src/tsconfig.app.json",
      "compilerOptions": {}
    })
  ]
});
