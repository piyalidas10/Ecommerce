const express = require('express'); //server starts (express framework for routing all these)
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
  const categories = [{
      "catId": "1",
      "catName": "electronics",
      "catDesc": "electronics",
      "subCat": ["Laptops"]
    },
    {
      "catId": "2",
      "catName": "appliances",
      "catDesc": "appliances",
      "subCat": ["Television", "Microwave"]
    },
    {
      "catId": "3",
      "catName": "home-furniture",
      "catDesc": "home & furniture",
      "subCat": ["Kitchen", "Furniture"]
    }
  ];
  res.status(200).json({
    message: 'Successfully get categories',
    categories: categories
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
  res.render('error');
});

module.exports = app;
