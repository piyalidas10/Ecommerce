const Products = require("../models/products");

exports.orderProducts = (req, res, next) => {
    Products.find( { Category: req.body.category}).then(prods => {
      res.status(200).json({
        products: prods
      });
    });
};