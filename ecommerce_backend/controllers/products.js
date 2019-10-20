const Products = require("../models/products");

exports.getProducts = (req, res, next) => {
    Products.find( { Category: req.body.category}).then(prods => {
      res.status(200).json({
        products: prods
      });
    });
};

exports.getProductDetails = (req, res, next) => {
  console.log(req.body.productid);
  Products.findOne( { _id: req.body.productid}).then(prods => {
    res.status(200).json({
      productinfo: prods
    });
  });
};
