import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import router from './router';

const app = express();

app.use(bodyParser.json({ limit: '1024mb' }));
app.use(router);

const httpServer = new http.Server(app);

webpackConfig.output.path = '/';

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
  contentBase: './dist',
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/rest/*': 'http://localhost:6139',
  },
});

server.listen(3000, () => {
  httpServer.listen(6139);

  /* eslint-disable no-console */
  console.log('App server listening on port 3000');
  console.log('Build app...');

  /* eslint-enable no-console */
});