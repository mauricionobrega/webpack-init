const distFolder = 'dist',
  path = require('path'),
  utils = require('./utils'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  _files = require('./_files'),
  _ignoreFiles = require('./_ignore-files'),
  _javascripts = require('./_javascripts'),
  _styles = require('./_styles'),
  _staticTextFiles = utils.listFiles('src', /\.(html|template|svg)$/),
  PWD = process.env.PWD,
  root = path.resolve(PWD),
  dist = path.resolve(PWD, distFolder),
  pages = utils.requireRecursive(path.join(__dirname, 'pages'));

const SpritePlugin = require('svg-sprite-loader/plugin');


module.exports = {
  context: root,
  devtool: 'source-map',
  entry: utils.spreadMerge(pages, {static: _staticTextFiles}), //utils.spreadMerge(_javascripts, _styles, {static: _staticTextFiles}),
  watch: false,
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
        test: /\.(gif|png|jpe?g|svg|webp)$/i,
        loaders: [
          'file-loader?name=[path][name].min.[ext]', {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              svgo:{
                plugins: [
                  {
                    removeViewBox: true
                  },
                  {
                    removeEmptyAttrs: true
                  },
                  {
                    removeTitle: true
                  }
                ]
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
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
        test: /\.(html|template)$/,
        loaders: [
         'file-loader?name=[path][name].[ext]',
         {
            loader: 'html-minify-loader',
            options: {
             quotes: false,
             dom: {
               lowerCaseTags: true,
               removeComments: true,
               collapseWhitespace: true
              }
            }
         }
        ]
      },

      // images from img/flags goes to flags-sprite.svg
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader?name=./mauricio/flags-sprite.min.[ext]',
        include: path.resolve('./svg/img/flags'),
        options: {
          extract: true,
          spriteFilename: 'flags-sprite.svg'
        }
      },

      // images from img/icons goes to icons-sprite.svg
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader?name=./mauricio/icons-sprite.min.[ext]',
        include: path.resolve('./svg/img/icons'),
        options: {
          extract: true,
          spriteFilename: 'icons-sprite.svg'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([distFolder], {
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
      ignore: _ignoreFiles,
      copyUnmodified: true,
      debug: true
    }),
    new SpritePlugin()
  ]
};