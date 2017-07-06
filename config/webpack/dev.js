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
  devtool: 'source-map',
  entry: utils.merge(_javascripts, _styles),
  output: {
    path: path.resolve(PWD, 'dist'),
    filename: 'js/[chunkHash].[name].js'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        // use: 'css-loader'
        use: [
          { loader: 'css-loader', options: { minimize: true } }
        ]
      }),
    }, {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    }]
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
    new CopyWebpackPlugin([], {
      ignore: [
        '*.txt', // Doesn't copy any files with a txt extension
        '**/*', // Doesn't copy any file, even if they start with a dot
        { glob: '**/*', dot: false } // Doesn't copy any file, except if they start with a dot
      ],
      copyUnmodified: true // By default, we only copy modified files during a watch or webpack-dev-server build. Setting this to `true` copies all files.
    })
  ]
};