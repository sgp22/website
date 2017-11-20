const fs = require('fs');
const path = require('path');
const DefinePlugin = require("webpack/lib/DefinePlugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const atImport = require("postcss-import");
const postcssCssnext = require('postcss-cssnext');
const stylelint = require("stylelint");

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin, SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
  // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
  const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
  const minimizeOptions = {
      autoprefixer: false,
      safe: true,
      mergeLonghand: false,
      discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
  };
  return [
      postcss([
        postcssUrl({
            url: (URL) => {
                // Only convert root relative URLs, which CSS-Loader won't process into require().
                if (!URL.startsWith('/') || URL.startsWith('//')) {
                    return URL;
                }
                if (deployUrl.match(/:\/\//)) {
                    // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                    return `${deployUrl.replace(/\/$/, '')}${URL}`;
                }
                else if (baseHref.match(/:\/\//)) {
                    // If baseHref contains a scheme, include it as is.
                    return baseHref.replace(/\/$/, '') +
                        `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
                else {
                    // Join together base-href, deploy-url and the original URL.
                    // Also dedupe multiple slashes into single ones.
                    return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
            }
        }),
        atImport({
          plugins: [ stylelint() ]
        }),
        postcssCssnext()
      ]),
  ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};
const ENV = process.env.NODE_ENV = process.env.ENV = "development";
let DOMAIN = process.env.DOMAIN || "";
const ROOT_URL_PATH = process.env.ROOT_URL_PATH || "";

// Subdirectory app root for pool server
if (ROOT_URL_PATH && ROOT_URL_PATH.length) {
  DOMAIN = `${DOMAIN}/${ROOT_URL_PATH}`;
}

module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules",
      "./node_modules"
    ],
    "symlinks": true
  },
  "resolveLoader": {
    "modules": [
      "./node_modules",
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./src/main.ts",
      "./src/styles.css"
    ],
    "polyfills": [
      "./src/polyfills.ts"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "publicPath": DOMAIN,
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js"
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.js$/,
        "loader": "source-map-loader",
        "exclude": [
          /(\\|\/)node_modules(\\|\/)/
        ]
      },
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg|cur)$/,
        "loader": "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        "test": /\.js$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": true
            }
          }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        test: /\.css$/,
        use: [
          { "loader": "raw-loader" }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/styles.css")
        ],
        "test": /\.css$/,
        "use": ExtractTextPlugin.extract({
          "fallback": "style-loader",
          "use": [
            {
              "loader": "css-loader",
              "options": {
                "importLoaders": 1
              }
            },
            {
              "loader": "postcss-loader",
              "options": {
                "ident": "postcss",
                "plugins": postcssPlugins
              }
            }
          ]
        })
      },
      {
        "test": /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        "use": [
          {
            "loader": "@angular-devkit/build-optimizer/webpack-loader",
            "options": {
              "sourceMap": true
            }
          },
          "@ngtools/webpack"
        ]
      }
    ]
  },
  "plugins": [
    new DefinePlugin({
      "ENV": JSON.stringify(ENV) || "development",
      "DOMAIN": JSON.stringify(process.env.DOMAIN) || JSON.stringify("http://localhost"),
      "DOMAIN_PROD": JSON.stringify(process.env.DOMAIN_PROD) || JSON.stringify("http://docs-site-staging.us-east-1.elasticbeanstalk.com"),
      "DOMAIN_VERSION": JSON.stringify(process.env.DOMAIN_VERSION) || JSON.stringify("v2"),
      "ROOT_URL_PATH": JSON.stringify(process.env.ROOT_URL_PATH) || JSON.stringify(""),
      "process.env": {
        "ENV": JSON.stringify(ENV) || "development",
        "DOMAIN_PROD": JSON.stringify(process.env.DOMAIN_PROD) || JSON.stringify("http://docs-site-staging.us-east-1.elasticbeanstalk.com"),
        "DOMAIN": JSON.stringify(process.env.DOMAIN) || JSON.stringify("http://localhost"),
        "DOMAIN_VERSION": JSON.stringify(process.env.DOMAIN_VERSION) || JSON.stringify("v2"),
        "ROOT_URL_PATH": JSON.stringify(process.env.ROOT_URL_PATH) || JSON.stringify(""),
      }
    }),
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        "context": "src/",
        "to": "",
        "from": {
          "glob": "assets/**/*",
          "dot": true
        }
      },
      {
        "context": "src/",
        "to": "",
        "from": {
          "glob": "favicon.ico",
          "dot": true
        }
      },
      {
        "context": "src/",
        "to": "assets/iux/css",
        "from": "../node_modules/@infor/iux-components/dist/iux.min.css"
      },
      {
        "context": "src/",
        "to": "assets/documentation-css/css",
        "from": "../node_modules/@infor/documentation-css/dist/documentation.min.css"
      }
    ], {
      "ignore": [
        ".gitkeep"
      ],
      "debug": "warning"
    }),
    new ExtractTextPlugin("styles.css"),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": /(\\|\/)node_modules(\\|\/)/,
      "failOnError": false
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src/index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [],
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
      }
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        "assets/documentation-css/css/documentation.min.css",
        "assets/iux/css/iux.min.css"
      ],
      append: true,
      publicPath: true
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": [
        "inline"
      ],
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": [
        "vendor"
      ],
      "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
      "chunks": [
        "main"
      ]
    }),
    new SourceMapDevToolPlugin({
      "filename": "[file].map[query]",
      "moduleFilenameTemplate": "[resource-path]",
      "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
      "sourceRoot": "webpack:///"
    }),
    new CommonsChunkPlugin({
      "name": [
        "main"
      ],
      "minChunks": 2,
      "async": "common"
    }),
    new NamedModulesPlugin({}),
    new SuppressExtractedTextChunksWebpackPlugin()
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  },
  "devServer": {
    "historyApiFallback": {
      "disableDotRule": true
    },
  }
};
