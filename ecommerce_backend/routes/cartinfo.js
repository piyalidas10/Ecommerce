const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const cartController = require("../controllers/cartinfo");

router.post('/', cartController.orderProducts);
router.post('/check', cartController.checkProduct);
router.post('/addqty', cartController.addProductQantity);
router.post('/deleteqty', cartController.deleteProductQantity);
router.post('/removeprod', cartController.removeProduct);
  
module.exports = router;
