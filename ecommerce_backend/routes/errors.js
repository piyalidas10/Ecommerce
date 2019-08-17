const express = require("express");
const router = express.Router();

const Servererrors = require("../models/errors");

router.get('/', (req, res, next) => {
  Servererrors.find().then(srverrors => {
    res.status(200).json({
      srverrors: srverrors
    });
  });
});

module.exports = router;
