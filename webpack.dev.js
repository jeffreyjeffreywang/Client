const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const common = require('./webpack.common.js')

module.exports = (env) => {
  if (env.API_KEY) {
    console.log('\x1b[36m%s\x1b[0m', '\nAPI key loaded\n')
  } else {
    console.log('\x1b[33m%s\x1b[0m', '\nWarning - No API_KEY declared\n')
  }

  return merge(common, {
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      hot: true,
      host: '127.0.0.1', // '0.0.0.0'
      disableHostCheck: true,
      open: true,
      port: 9000,
      stats: 'minimal'
    },
    devtool: 'eval',
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.API_KEY': JSON.stringify(env.API_KEY)
      })
    ]
  })
}
