const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    'shapedivernodemodule-viewersettings': './src/main.ts',
    'shapedivernodemodule-viewersettings': './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, 'bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ViewerSettings',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true,
      include: /\.min\.js$/,
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  }
};