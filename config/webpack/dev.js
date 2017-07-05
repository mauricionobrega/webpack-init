const path = require('path'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  _javascripts = require('./_javascripts'),
  _styles = require('./_styles'),
  utils = require('./utils');

module.exports = {
  devtool: 'source-map',
  entry: utils.merge(_javascripts, _styles),
  output: {
    path: path.resolve(process.env.PWD, 'dist'),
    filename: 'js/[chunkHash].[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
      }),
    }, {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(process.env.PWD),
      exclude: ['**/*'],
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin({
      filename: 'styles/[chunkHash].[name].css',
      allChunks: true,
      disable: process.env.NODE_ENV === 'development'
    })
  ]
};