var path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin
const cssnano = require('cssnano')

process.env.NODE_ENV = 'production'
const Components = require('../components.json')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: Components,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: '[name]/index.js',
    publicPath: '/dist',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'antd': 'antd'
  },
  // stats: 'errors-only',
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}), 
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: cssnano,
        cssProcessorOptions: {
          map: {
            // 不生成内联映射,这样配置就会生成一个source-map文件
            inline: false,
            // 向css文件添加source-map路径注释
            // 如果没有此项压缩后的css会去除source-map路径注释
            annotation: true
          }
        }
      })
    ],
  },
  plugins: [
    new CleanPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name]/style/index.css',
    }),
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties',
            // antd 按需加载
            ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: 'css' }, 'antd'],
            ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
            ['import', { libraryName: '@ant-design/icons', libraryDirectory: '', camel2DashComponentName: false }, 'antd-icon'],
          ],
        },
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: path.resolve(__dirname, './')
              }
            },
          }
        ],
        // exclude: /node_modules/,
      }, {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: [{ loader: 'url-loader' }]
      }
    ]
  }
}