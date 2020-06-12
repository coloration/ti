const path = require('path')

module.exports = {
  entry: './lib/index.js',
  mode: 'production',
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
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'window'
  }
}