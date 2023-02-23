var HtmlWebpackPlugin = require('html-webpack-plugin');
var package = require('./package.json');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    vendor: Object.keys(
      package.dependencies || {}
    ),
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name].bundle.js'
  },
  watch: true,
  resolve: { extensions: ['.js', '.ts'] },
  devServer: {
    contentBase: path.join(__dirname, './dist/'),
    port: 9000
  },
  optimization: {
    splitChunks: {
      name: 'shared',
      minChunks: 2
    }
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      chunks: ['vendor', 'shared', 'app'],
      path: path.join(__dirname, './dist/'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'My Awesome application',
      myPageHeader: 'Settings',
      template: './src/index.html',
      chunks: ['vendor', 'shared', 'settings'],
      path: path.join(__dirname, './dist/'),
      filename: 'settings.html'
    })
  ]
};
