var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
        {
            // Test expects a RegExp! Note the slashes!
            test: /\.css$/,
            loaders: ['style', 'css'],
            // Include accepts either a path or an array of paths.
            include: path.join(__dirname, 'css')
        },
        {
            test: /\.js$/,
            loaders: [ 'babel' ],
            exclude: /node_modules/,
            include: __dirname
        },
        {  test: /\.json$/,
            loader: 'json'
        },
    ]
  }
}
