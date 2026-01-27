import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import bicycleRouter from './routes/bicycle.js';
import { STATUS_CODES } from 'node:http';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/bicycle', bicycleRouter);

app.use(function (req, res, next) {
  if (req.method !== "GET") {
    next(STATUS_CODES[404]);
  }
});

// error handler
app.use(function (err, req, res, next) {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send({
    error: {
      status: statusCode,
      message: err.message,
      // stack: req.app.get('env') === 'development' ? err.stack : {}
    }
  });
});

export default app;
