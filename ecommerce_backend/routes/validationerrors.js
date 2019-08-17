const express = require("express");
const router = express.Router();

const Validationerrors = require("../models/validationerrors");

router.get('/', (req, res, next) => {
  Validationerrors.find().then(vlderrors => {
    res.status(200).json({
      vlderrors: vlderrors
    });
  });
});

module.exports = router;