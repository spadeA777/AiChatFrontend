process.env.NODE_ENV = 'production';
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const openBrowser = require('react-dev-utils/openBrowser');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
const paths = require('../config/paths');

const PORT = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const { appHtml, appBuild } = paths;

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    devMiddleware: {
      stats: {
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        publicPath: false,
      },
      writeToDisk: true,
    },
    compress: true,
    host: host,
    port: PORT,
    historyApiFallback: true,
    onAfterSetupMiddleware: () => {
      openBrowser && openBrowser(`http://localhost:${PORT}/`);
    },
    onListening: function () {
      console.log('Listening on port:', PORT);
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml,
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin({ analyzerPort: PORT })
  ],
  output: {
    path: appBuild,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    clean: true
  },
});
