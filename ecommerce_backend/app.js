const path = require("path");
const express = require('express'); //server starts (express framework for routing all these)
const compression = require('compression');
const bodyParser = require("body-parser");

const database = require('./config/database');
const mongoose = require('mongoose'); // require mongoose

const categoriesRoutes = require('./routes/categories');
const contentRoutes = require('./routes/content');
const errorsRoutes = require('./routes/errors');
const validationerrorsRoutes = require('./routes/validationerrors');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cartinfo');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');


const swaggerDocument = require('./openapi.json');

const cors = require('cors');
const helmet = require('helmet');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


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

//these are the fixes for the deprecation warnings...
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// GZIP all assets
app.use(compression());
app.use(express.static('assets'));
app.use(express.static('images'));

// Body parser middleware
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

// secure apps by setting various HTTP headers
app.use(helmet()); 
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

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

app.use('/api/categories', categoriesRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/errors', errorsRoutes);
app.use('/api/validationerrors', validationerrorsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

module.exports = app;
