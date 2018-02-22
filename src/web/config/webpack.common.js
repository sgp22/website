
// NPM Modules
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
const cssnano = require('cssnano');
const atImport = require("postcss-import");
const postcssCssnext = require('postcss-cssnext');
const postcssAtRulesVars = require('postcss-at-rules-variables');

// Plugins
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin, SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;

// Constants
const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";

const cssExtract = new ExtractTextPlugin("assets/site/css/styles.css");

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
      atImport(),
      postcssAtRulesVars(),
      postcssCssnext(),
      cssnano(minimizeOptions)
    ]),
  ]
};

// Variables
let appDomain = process.env.DOMAIN || "http://localhost";
let metaData = { baseUrl: `/` };

// Common Webpack Config
module.exports = {
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      nodeModules
    ],
    "symlinks": true
  },
  "resolveLoader": {
    "modules": [
      nodeModules
    ]
  },
  "entry": {
    "main": [
      "./src/main.ts",
      "./src/css/site.css"
    ],
    "polyfills": [
      "./src/polyfills.ts"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "publicPath": appDomain,
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
          nodeModules
        ]
      },
      {
        "test": /\.html$/,
        "loader": "raw-loader",
        "exclude": path.join(process.cwd(), "src/index.html")
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
          path.join(process.cwd(), "src/css/site.css")
        ],
        test: /\.css$/,
        use: [
          { "loader": "raw-loader" }
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src/css/site.css")
        ],
        "test": /\.css$/,
        "use": cssExtract.extract({
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
      "IS_PRODUCTION": JSON.stringify(process.env.NODE_ENV === 'production'),
      "DOMAIN": JSON.stringify(appDomain) || JSON.stringify("http://localhost"),
      "DOMAIN_VERSION": JSON.stringify(process.env.DOMAIN_VERSION) || JSON.stringify("v2"),
      "ROOT_URL_PATH": JSON.stringify(process.env.ROOT_URL_PATH) || JSON.stringify(""),
      "DOMAIN_DOCS_API": JSON.stringify(process.env.DOMAIN_DOCS_API) || JSON.stringify(appDomain)
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
        "to": "assets/ids-web/svgs",
        "from": `${nodeModules}/@infor/ids-web/dist/ids-icons.svg`
      },
      {
        "context": "src/",
        "to": "assets/ids-web/css",
        "from": `${nodeModules}/@infor/ids-web/dist/ids-reset.min.css`
      },
      {
        "context": "src/",
        "to": "assets/ids-web/css",
        "from": `${nodeModules}/@infor/ids-web/dist/ids-reset.min.css.map`
      },
      {
        "context": "src/",
        "to": "assets/ids-web/css",
        "from": `${nodeModules}/@infor/ids-web/dist/ids-web.min.css`
      },
      {
        "context": "src/",
        "to": "assets/ids-web/css",
        "from": `${nodeModules}/@infor/ids-web/dist/ids-web.min.css.map`
      }
    ], {
      "ignore": [
        ".gitkeep"
      ],
      "debug": "warning"
    }),
    new ProgressPlugin(),
    new CircularDependencyPlugin({
      "exclude": nodeModules,
      "failOnError": false
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src/index.html",
      "filename": "./index.html",
      "hash": false,
      "metadata": metaData,
      "inject": true,
      "compile": true,
      "favicon": "./src/favicon.ico",
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
        "assets/ids-web/css/ids-reset.min.css",
        "assets/ids-web/css/ids-web.min.css",
        "assets/site/css/site.css"
      ],
      append: false,
      publicPath: true
    }),
    cssExtract,
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
    new SuppressExtractedTextChunksWebpackPlugin(),
    new AngularCompilerPlugin({
      "mainPath": "main.ts",
      "platform": 0,
      "sourceMap": false,
      "tsConfigPath": "src/tsconfig.app.json",
      "compilerOptions": {}
    })
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
  }
};
