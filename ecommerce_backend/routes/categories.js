const express = require("express");
const router = express.Router();

const Categories = require("../models/categories");

router.get('/', (req, res, next) => {
  Categories.find().then(cats => {
    res.status(200).json({
      categories: cats
    });
  });
});


module.exports = router;
