const express = require("express");
const router = express.Router();

const Content = require("../models/content");

router.get('/', (req, res, next) => {
  Content.find().then(content => {
    res.status(200).json({
      content: content
    });
  });
});


module.exports = router;
