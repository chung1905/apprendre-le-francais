var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var keys = require('./config/keys');

var signupRouter = require('./routes/user/signup');
var loginRouter = require('./routes/user/signin');
var authRouter = require('./routes/user/authenticate');
var uploadRouter = require('./routes/user/upload');
var lessonRouter = require('./routes/lesson');
var levelsRouter = require('./routes/levels');
var levelRouter = require('./routes/level');

var app = express();
mongoose.connect('mongodb://localhost/alf', {
  useCreateIndex: true,
  useNewUrlParser: true
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

checkToken = function (token) {
  var name = false;
  jwt.verify(token, keys.secretKey, (err, decoded) => {
    if (decoded !== undefined && Date.now() < decoded.exp * 1000) {
      name = decoded.name;
    }
  });
  return name;
};

app.use(function (req, res, next) {
  const body = req.body;
  if (body.token) {
    req.loggedUser = checkToken(body.token);
  }
  next();
});

app.use('/public', express.static('../view/public'));
app.use('/signup', signupRouter);
app.use('/authenticate', authRouter);
app.use('/login', loginRouter);
app.use('/upload', uploadRouter);
app.use('/lesson', lessonRouter);
app.use('/levels', levelsRouter);
app.use('/level', levelRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
});

module.exports = app;
