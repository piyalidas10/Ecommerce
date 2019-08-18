const express = require("express");
const router = express.Router();

const CustomersController = require("../controllers/customers");

router.post('/', CustomersController.createCustomers);
  
module.exports = router;
