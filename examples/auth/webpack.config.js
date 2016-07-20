const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: [
      'webpack/hot/dev-server',
      './examples/auth/src/app.js',
    ],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /.js$/,
        loaders: ['react-hot', 'babel'],
        include: [
          path.join(__dirname, 'src'),
          path.resolve(__dirname, '../../../src'),
        ],
      },
      {
        test: /.html$/,
        loaders: ['file?name=[name].[ext]'],
      },
    ],
  },

  devtool: '#inline-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
