const path = require('path'),
  utils = require('./utils'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  _files = require('./_files'),
  _javascripts = require('./_javascripts'),
  _styles = require('./_styles'),
  _staticTextFiles = utils.listFiles('src', /\.(html|svg)$/),
  PWD = process.env.PWD,
  root = path.resolve(PWD),
  dist = path.resolve(PWD, 'dist');

module.exports = {
  context: root,
  devtool: 'source-map',
  entry: utils.merge(_javascripts, _styles), // utils.spreadMerge(_javascripts, _styles, {static: _staticTextFiles}),
  watch: true,
  resolve: {
    extensions: ['.scss', '.js']
  },
  stats: {
    colors: true,
    reasons: true,
    debug: true
  },
  devServer: {
    outputPath: dist
  },
  output: {
    path: dist,
    publicPath: dist,
    filename: 'js/[chunkHash].[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')()
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        }),
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader?name=[chunkHash].[name].[ext]']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: root,
      exclude: ['**/*'],
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin({
      filename: 'styles/[chunkHash].[name].css',
      allChunks: true,
      disable: process.env.NODE_ENV === 'development'
    }),
    new CopyWebpackPlugin(_files, {
      ignore: ['*.txt', '*.DS_Store', '*.sass-cache', '*.swp'],
      copyUnmodified: true,
      debug: true
    })
  ]
};