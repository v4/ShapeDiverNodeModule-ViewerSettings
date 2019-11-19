const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ClosurePlugin = require('closure-webpack-plugin');


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
    // new UglifyJsPlugin({
    //   sourceMap: true,
    //   include: /\.min\.js$/,
    // })
    new ClosurePlugin({mode: 'STANDARD'})
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