const path = require('path'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  _files = require('./_files'),
  _javascripts = require('./_javascripts'),
  _styles = require('./_styles'),
  utils = require('./utils'),
  PWD = process.env.PWD;

module.exports = {
  context: path.resolve(PWD),
  devtool: 'source-map',
  entry: utils.merge(_javascripts, _styles),
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
    outputPath: path.resolve(PWD, 'dist')
  },
  output: {
    path: path.resolve(PWD, 'dist'),
    publicPath: path.resolve(PWD, 'dist'),
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
                plugins: [require('autoprefixer')()]

              }
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
      root: path.resolve(PWD),
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
      copyUnmodified: true
    })
  ]
};