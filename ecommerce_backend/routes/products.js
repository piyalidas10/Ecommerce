/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products management
 */

/**
 * @swagger
 * path:
 *  /api/getProducts/:
 *    post:
 *      summary: Create a new user
 *      tags: [Products]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema: # Request body contents
 *              type: string
 *              properties:
 *                  category:
 *                      type: string
 *              example:
 *                  category: appliances
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Products'
 */
const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/products");

router.post('/',  ProductsController.getProducts);
router.post('/productdetails',  ProductsController.getProductDetails);
  
module.exports = router;