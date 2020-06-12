const path = require('path')

module.exports = {
  entry: './lib/index.js',
  // mode: 'development',
  mode: 'production',

  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /(node_modules|test)/
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  }
}