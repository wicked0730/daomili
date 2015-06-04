var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var search_index = require('./routes/search/index');

var entrust = require('./routes/entrust');

var app = express();

global.logger = require("./utils/logger.js");
global.moment = require('moment');
global.moment.locale('zh-cn');
global.DB = require("./utils/dbutil.js").Instance();

//用户
DB.define({key:'User',name:'DML_USER',fields:['ID','CREATEDATE','CREATOR','LASTUPTDATE','LASTUPTUSER','VERSION','EMAIL','FULLNAME','IDCARD','MOBILE','PASSWORD','PHONE','SEX','USERNAME','USERSTATUS','STATUS','ORGCODE','RAMARK','DEPARTMENT','AGE']});
//委托
DB.define({key:'Entrust',name:'DML_ENTRUST',fields:['ID','COMPANYNAME','CONTACT','MOBILE','QQ','EMAIL','CREATEDATE','CREATOR','LASTUPTDATE','LASTUPTUSER','VERSION','STATUS']});

//用于copy  DB.define({key:'User',name:'DML_EMPTY',fields:['ID','CREATEDATE','CREATOR','LASTUPTDATE','LASTUPTUSER','VERSION','STATUS']});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/search/index', search_index);

app.use('/entrust', entrust);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
