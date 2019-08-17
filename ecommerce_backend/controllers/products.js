const Products = require("../models/products");

exports.getProducts = (req, res, next) => {
    Products.find().then(prods => {
      res.status(200).json({
        products: prods
      });
    });
};