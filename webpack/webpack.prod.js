/* eslint-disable indent */
process.env.NODE_ENV = 'production';
const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageminWebpack = require('image-minimizer-webpack-plugin');
const paths = require('../config/paths');
const { appBuild, appPublic, appHtml } = paths;

// const imageTypeIgnoreCopy = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];

// Source maps are resource heavy and can cause out of memory issue for large source files.

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(appPublic, 'lib'),
          to: path.resolve(appBuild, 'lib'),
          toType: 'dir',
        },
        {
          from: path.resolve(appPublic, 'resources'),
          to: path.resolve(appBuild, 'resources'),
          toType: 'dir',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.ProgressPlugin({
      modulesCount: 5000,
    }),
  ],
  output: {
    publicPath: '/',
    pathinfo: true,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    clean: true,
  },
  optimization: {
    nodeEnv: 'production',
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // },
    minimize: true,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 5,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      // This is only used in production mode
      new CssMinimizerPlugin(),
      new ImageminWebpack({
        severityError: 'warning', // Ignore errors on corrupted images
        minimizerOptions: {
          plugins: ['gifsicle'],
        },
        // Disable `loader`
        loader: false,
      }),
    ],
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
