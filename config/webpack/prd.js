var path = require('path'),
  webpack = require('webpack'),
  _javascripts = require('./_javascripts');

module.exports = {
  devtool: "source-map",
  entry: _javascripts,
  output: {
    path: path.resolve(process.env.PWD, 'dist'),
    filename: '[chunkHash].[name].js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  ]
};