'use strict'

const DIR = './build'

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const bundler = webpack(webpackConfig)

require('browser-sync')
  .create()
  .init({
    proxy: {
      target: 'http://localhost:3000/fbcanvas.html',
      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: false
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    files: [
      `${DIR}/asset/css/*.css`,
      `${DIR}/asset/font/*`,
      `${DIR}/asset/img/*`,
      `${DIR}/*.html`
    ],
    open: 'external'
  }, () => console.log('Browsersync is running...'))
