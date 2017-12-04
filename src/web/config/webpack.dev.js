// ************************************************
// Webpack Environment: development
// ************************************************

// Set all node environment variables
process.env.NODE_ENV = process.env.ENV = "development";

const path = require("path");
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

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
  }
});
