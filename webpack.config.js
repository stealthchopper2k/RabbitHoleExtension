
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
// import 'core-js/stable';

module.exports = {
  entry: "./src/popup.jsx",
  output: {
    filename: "[name].js",
    scriptType: "text/javascript",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    nodeEnv: 'development',
  },
  module: {
    rules: [{
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
      exclude: /node_modules/
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
  devServer: {
    devMiddleware: {
      index: false, // specify to enable root proxying
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    proxy: [
      {
        context: ['/auth/google/callback', '/auth/google', '/auth/me', '/auth/logout'
        ],
        target: 'http://localhost:4500/api/v1',
        changeOrigin: true,
      },
      {
        context: ['/history', '/update'],
        target: 'http://localhost:4500/user',
        changeOrigin: true,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
    }),
    new NodePolyfillPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public" },
      ],
      options: {
        concurrency: 100,
      },
    })
  ],
};