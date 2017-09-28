const path = require("path");
const { ContextReplacementPlugin } = require("webpack");
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

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
    new ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, '../src')
    )
  ]
});