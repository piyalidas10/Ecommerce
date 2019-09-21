const Customers = require("../models/customers");
const Products = require("../models/products");
const Categories = require("../models/categories");

exports.getCustomersByYear = (req, res, next) => {
    Customers.aggregate(
      [
         {
           $group : {
              _id : { month: { $month: "$customerRegisterDate" }, year: { $year: "$customerRegisterDate" } },
              count: { $sum: 1 }
           }
         }
      ]
   )
    .then(custs => {
      res.status(200).json({
        custlists: custs
      });
    });
};


exports.getCustomersByGender = (req, res, next) => {
  Customers.aggregate(
    [
      {$project: {
          male: {$cond: [{$eq: ["$customerGender", "male"]}, 1, 0]},
          female: {$cond: [{$eq: ["$customerGender", "female"]}, 1, 0]},
      }},
      {$group: { _id: null, 
          male: {$sum: "$male"},
          female: {$sum: "$female"}
      }},
    ]
 )
  .then(custsgen => {
    res.status(200).json({
      custlistsgen: custsgen
    });
  });
};


exports.getProductsByCategory = (req, res, next) => {
  Products.aggregate(
    [
      {
        $group : {
          _id: "$Category", 
          count:{ $sum: 1 }
        }
      }
    ]
  )
  .then(prodts => {
    res.status(200).json({
      prodGroupCount: prodts
    });
  });
};

