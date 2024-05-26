var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require("./routes/user/routes")
var productRouter = require("./routes/products/routes")
var session = require('cookie-session')
var flash = require('express-flash')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  name: 'session',
  keys: ["adnkldmw,endscjmkc.,wdnscmk,csdml.sdf"],

  // Cookie Options
  maxAge: 72 * 60 * 60 * 1000 // 72 hours
}))  
app.use(flash());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
