var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
mongoose.connect('mongodb://localhost/my_database');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
var engines = require('consolidate');

app.engine('html', engines.mustache);
app.set('view engine', 'html');
var BlogPost = new Schema({
  title     : String
  , body      : String
});
var BlogData = mongoose.model('BlogPost', BlogPost);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
//app.use('/api/post',router);

app.post('/api/post', function(req,res){
  console.log("test vo api");
  console.log(req.body);

   var abd = new BlogData({
   title : "test",
   body : req.body.blog
});
 abd.save(function(err,data){});
 res.send("testsss");
});
app.get('/api/get', function(req, res) {
console.log("into get");
  BlogData.findOne({},function(err,BlogPost){
    console.log(BlogPost);
    res.json(BlogPost);
  });
});
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
