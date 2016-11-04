'use strict'

const CWD = process.cwd()
const ENV = process.env.NODE_ENV || 'development'
const PRODUCTION = ENV === 'production'

const path = require('path')
const src = path.resolve(CWD, 'src/public')
const webpack = require('webpack')
const WebpackExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackHtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackProgressBarPlugin = require('progress-bar-webpack-plugin')

const webpackDev = (entry) => PRODUCTION ? entry : ['webpack/hot/dev-server', 'webpack-hot-middleware/client', entry]

let config = {
  context: src,
  cache: true,
  entry: {
    'asset/js/app.js': webpackDev('./js/app.js'),
    'asset/css/app.css': './scss/app.scss'
  },
  output: {
    filename: '[name]',
    publicPath: '',
    path: path.resolve(CWD, 'build')
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.(woff2?|ttf|eot|svg)$/,
      loader: 'file?name=asset/font/[name].[ext]?[hash]'
    }, {
      test: /img\/.+\.(jpe?g|png|gif|svg)$/,
      loader: 'url?limit=1000&name=asset/img/[name].[ext]?[hash]!img?progressive=true'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.jsx?$/,
      exclude: [
        /node_modules/
      ],
      loader: 'babel?compact=false'
    }, {
      test: /\.pug$/,
      loader: 'pug'
    }, {
      test: /\.scss$/,
      loader: WebpackExtractTextPlugin.extract('style', 'css!sass')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.jpg', '.jpeg', '.gif', '.png', '.svg'],
    alias: {
      img: `${src}/img/`,
      module: `${src}/js/module`,
      pug: `${src}/pug`
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackProgressBarPlugin(),
    new WebpackExtractTextPlugin('[name]', {
      allChunks: true
    })
  ].concat(['index', 'fbcanvas'].map((file) => new WebpackHtmlWebpackPlugin({
    template: `pug/${file}.pug`,
    filename: `${file}.html`,
    inject: false,
    minify: PRODUCTION ? {
      html5: true,
      includeAutoGeneratedTags: true
    } : false
  })))
}

if (PRODUCTION) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])

  config.devtool = null
}

module.exports = config
