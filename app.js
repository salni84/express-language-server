
require('dotenv').config();
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const bodyParser = require("body-parser");

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({limit: '50mb'}))
app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '50mb'
    })
)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

let allowCrossDomain =  function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Content-Type", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials",  true)

  console.log(req)

  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
};

app.use(allowCrossDomain)

module.exports = app;
