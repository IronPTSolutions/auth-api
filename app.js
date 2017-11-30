require("dotenv").config();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var cors = require('cors');

require('./config/db.config');
require('./config/passport.config').setup(passport);
const corsConfig = require('./config/cors.config');

const authRoutes = require('./routes/auth.route');
const usersRoutes = require('./routes/users.route');

var app = express();

app.use(logger('dev'));
app.use(cors(corsConfig))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'SuperSecret',
  resave: true,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true, 
    maxAge: 2419200000
  }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message : err.message });
});

module.exports = app;
