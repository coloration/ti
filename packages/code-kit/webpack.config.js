const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')


module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /.j|ts$/,
        // exclude: /node_modules/,
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'kit',
    libraryTarget: 'umd',
  }
}