"use strict";

var path = require('path');

var express = require('express');

var morgan = require('morgan');

var rateLimit = require('express-rate-limit');

var helmet = require('helmet');

var mongoSanitize = require('express-mongo-sanitize');

var xss = require('xss-clean');

var hpp = require('hpp');

var AppError = require('./utils/appError');

var globalErrorHandler = require('./controllers/errorController');

var tourRouter = require('./routes/tourRoutes');

var userRouter = require('./routes/userRoutes');

var reviewRouter = require('./routes/reviewRoutes');

var app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); // 1) GLOBAL MIDDLEWARES
// Serving static files
//app.use(express.static(`${__dirname}/public`));

app.use(express["static"](path.join(__dirname, 'public'))); // Set security HTTP headers

app.use(helmet()); // Development logging

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // Limit requests from same API


var limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter); // Body parser, reading data from body into req.body

app.use(express.json({
  limit: '10kb'
})); // Data sanitization against NoSQL query injection

app.use(mongoSanitize()); // Data sanitization against XSS

app.use(xss()); // Prevent parameter pollution

app.use(hpp({
  whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
})); // Test middleware

app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString(); // console.log(req.headers);

  next();
}); // 3) ROUTES

app.get('/', function (req, res) {
  res.status(200).render('base', {
    tour: 'The Forest Hiker',
    user: 'Godspower'
  });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', function (req, res, next) {
  next(new AppError("Can't find ".concat(req.originalUrl, " on this server!"), 404));
});
app.use(globalErrorHandler);
module.exports = app;
//# sourceMappingURL=app.dev.js.map
