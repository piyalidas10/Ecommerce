const express = require('express'); //server starts (express framework for routing all these)
const bodyParser = require("body-parser");

const database = require('./config/database');
const mongoose = require('mongoose'); // require mongoose

const Categories = require("./models/categories");
const Content = require("./models/content");
const Servererrors = require("./models/errors");
const Validationerrors = require("./models/validationerrors");

const app = express();

// MongoDB connection
mongoose.connect(database.mlab.url, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

// On connection error
mongoose.connection.on('error', (error) => {
  console.log('Database error: ' + error);
});

// On successful connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

// Body parser middleware
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/categories', (req, res, next) => {
  Categories.find().then(cats => {
    res.status(200).json({
      categories: cats
    });
  });
});

app.use('/api/content', (req, res, next) => {
  Content.find().then(content => {
    res.status(200).json({
      content: content
    });
  });
});

app.use('/api/errors', (req, res, next) => {
  Servererrors.find().then(srverrors => {
    res.status(200).json({
      srverrors: srverrors
    });
  });
});

app.use('/api/validationerrors', (req, res, next) => {
  Validationerrors.find().then(vlderrors => {
    res.status(200).json({
      vlderrors: vlderrors
    });
  });
});

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error'); //this or res.status(err.status || 500).send('error')
});

module.exports = app;
