const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.get('/customersbyyear', adminController.getCustomersByYear);
router.get('/customersbygender', adminController.getCustomersByGender);

 
module.exports = router;
