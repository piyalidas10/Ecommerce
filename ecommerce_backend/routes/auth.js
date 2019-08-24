const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post('/register', authController.createCustomers);
router.post('/login', authController.loginCustomer);
  
module.exports = router;
