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
    path: './dist',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules[\\|\/]leaflet[\\|\/]dist[\\|\/]images/,
        loader: 'url-loader?limit=10000&name=/images/[name].[ext]',
      },
      {
        test: /\.(png|jpg)$/,
        include: /node_modules[\\|\/]leaflet[\\|\/]dist[\\|\/]images/,
        loader: 'file?name=/images/[name].[ext]',
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]',
      },
    ],
  },

  resolve: {
    root: [
      process.cwd(),
      path.resolve(process.cwd(), 'lib'),
    ],
  },

  devtool: '#inline-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
