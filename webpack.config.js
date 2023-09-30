const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// import 'core-js/stable';

module.exports = {
  entry: {
    "module/popup": "./src/popup.js",
  },
  output: {
    filename: "[name].js",
    scriptType: "text/javascript",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  node: false,
  module: {
    rules: [ {
      test: /\.(js|jsx|mjs)$/,
      resolve: {
        fullySpecified: false,
      },
      use: {
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env"], "@babel/preset-react"],
        },
      },
    },
    {
      test: /\.html$/i,
      loader: "html-loader",
    },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader", "postcss-loader"],
    },
    ]
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
      chunks: ["module/popup"]
    }),
    new CopyPlugin({
      patterns: [
        { from: "public"  },
      ],
      options: {
        concurrency: 100,
      },
    })
  ],
};