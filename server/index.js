import 'babel-polyfill';
import compression from 'compression';
import express from 'express';
import 'express-async-errors';
import cors from './middlewares/cors';
import error from './middlewares/error-handler';
import helmet from './middlewares/helmet';
import limiter from './middlewares/limiter';
import proxy from './middlewares/proxy';
import render from './middlewares/render';

const app = express();

// The request handler must be the first middleware on the app
app.use(helmet());
app.use(cors());
app.set('trust proxy', 1);
app.use('/access', limiter, proxy());

app.use(compression());
app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});
app.use('/static-desktop', express.static('public'));
app.use('/', express.static('seo'));

app.get('*', render);

// The error handler must be after any others middlewares
app.use(error);

app.listen(3000, () => {
  console.log('🕵️‍  Server started on port 3000...'); // eslint-disable-line

  if (process.send) {
    process.send('online');
  }
});
