/**
 * @swagger
 *  components:
 *    schemas:
 *      Products:
 *        type: object
 *        required:
 *          - Category
 *        properties:
 *          SubCategory:
 *            type: string
 *          Category:
 *            type: string
 *          SupplierName:
 *            type: string
 *          WeightMeasure:
 *            type: number
 *          WeightUnit:
 *            type: string
 *          Description:
 *            type: string
 *          Name:
 *            type: string
 *          DateOfSale:
 *            type: string
 *          ProductPicUrl:
 *            type: string
 *          Status:
 *            type: string
 *          Quantity:
 *            type: number
 *          CurrencyCode:
 *            type: string
 *          Price:
 *            type: number
 *          deliveryPrice:
 *            type: number
 *          DateOfEntry:
 *            type: date
 *      example:
 *           Category: electronics
 */
const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  SubCategory: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  SupplierName: {
    type: String,
    required: true
  },
  WeightMeasure: {
    type: Number,
    required: true
  },
  WeightUnit: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  DateOfSale: {
    type: String,
    required: true
  },
  ProductPicUrl: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  CurrencyCode: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  deliveryPrice: {
    type: Number,
    default: 0
  },
  DateOfEntry: {
    type: Date,
    required: true
  },
});

/* 
**To use our schema definition, we need to convert our categoriesSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
module.exports = mongoose.model('Products', productsSchema);
