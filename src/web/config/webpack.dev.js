const path = require("path");
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require("webpack/lib/DefinePlugin");
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const ENV = process.env.NODE_ENV = process.env.ENV = "development";

module.exports = webpackMerge(commonConfig, {
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
      "process.env": {
        "ENV": JSON.stringify(ENV)
      }
    }),
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "hostReplacementPaths": {
        "environments/environment.ts": "environments/environment.ts"
      },
      "sourceMap": false,
      "tsConfigPath": "src/tsconfig.app.json",
      "compilerOptions": {}
    })
  ]
});
