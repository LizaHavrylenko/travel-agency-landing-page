const path = require('path');
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
    optimization: {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true  
          }),
          new OptimizeCSSAssetsPlugin({})
        ]
      },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader?attrs[]=video:src',
                options: { minimize: true, root: path.resolve(__dirname, 'src') }
              }
            ]
          },
          {
            test: /\.mp4$/,
            loader: 'url-loader?limit=10000&mimetype=video/mp4'
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'image-webpack-loader',
            enforce: 'pre',
          },
          {
            test: /\.(png|jpg|gif|svg|webm|mp4)$/,
            use: [{
                loader: 'file-loader',
                options: {
                  root: path.resolve(__dirname, '/src'),
                  name: '[name].[ext]'
              }
            }]
          },
          {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "sass-loader"
            ]
          },
        ]
      },
      plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
          }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        })
      ]
    };