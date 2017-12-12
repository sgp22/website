// ************************************************
// Webpack Environment: development
// ************************************************

// Set all node environment variables
process.env.NODE_ENV = process.env.ENV = "development";

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  "module": {
    "rules": []
  },
  "watch": true,
  "watchOptions": {
    "ignored": "/node_modules/"
  }
});
