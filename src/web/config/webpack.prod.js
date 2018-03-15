// ************************************************
// Webpack Environment: production
// ************************************************

// Set all node environment variables
process.env.NODE_ENV = process.env.ENV;

const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = webpackMerge(commonConfig, {
  "module": {
    "rules": []
  }
});
