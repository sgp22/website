const path = require("path");
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require("webpack/lib/DefinePlugin");
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ENV = process.env.NODE_ENV = process.env.ENV = "development";

module.exports = webpackMerge(commonConfig, {
  "output": {
    "publicPath": ""
  },
  "module": {
    "rules": [
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack",
        "options": {
          "tsConfigPath": path.join(process.cwd(), "src/tsconfig.json")
        }
      }
    ]
  },
  "plugins": [
    new DefinePlugin({
      "ENV": JSON.stringify(ENV) || "development",
      "process.env": {
        "ENV": JSON.stringify(ENV) || "development"
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
