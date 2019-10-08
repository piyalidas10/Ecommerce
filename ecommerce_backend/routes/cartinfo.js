const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const cartController = require("../controllers/cartinfo");

router.post('/', cartController.orderProducts);
router.post('/check', cartController.checkProduct);
  
module.exports = router;
