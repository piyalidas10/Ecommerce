const express = require("express");
const router = express.Router();

const Content = require("../models/content");

router.get('/', (req, res, next) => {
  // Content.insertMany([{
  //   "siteTitle": "ecommerce",
  //   "sitePage": [{
  //       "pageName": "login & signup",
  //       "pageHeader": "login"
  //     },
  //     {
  //       "pageName": "logout",
  //       "pageHeader": "logout"
  //     },
  //     {
  //       "pageName": "cart",
  //       "pageHeader": "cart"
  //     }
  //   ],
  //   "slider": [{
  //       "title": "Los Angeles",
  //       "caption": "We had such a great time in LA!",
  //       "url": "https://demo.themedelights.com/Wordpress/WP01/WP004/wp-content/uploads/2019/03/Main_Banner-1-1.jpg"
  //     },
  //     {
  //       "title": "Chicago",
  //       "caption": "Thank you, Chicago!",
  //       "url": "https://demo.themedelights.com/Wordpress/WP01/WP004/wp-content/uploads/2019/03/Main_Banner-2-1.jpg"
  //     }
  //   ],
  //   "productPage": {
  //     "sidebar": {
  //       "header": "filters",
  //       "subheader": [
  //         "sub categories",
  //         "price"
  //       ]
  //     },
  //     "rightSide": {
  //       "header": "sort by",
  //       "subheaders": [
  //         "Price -- Low to High",
  //         "Price -- High to Low",
  //         "Newest First"
  //       ]
  //     }
  //   }
  // }]).then(content => {
  //     res.status(200).json({
  //       content: content
  //     });
  //   });

  Content.find().then(content => {
    res.status(200).json({
      content: content
    });
  });
});


module.exports = router;
