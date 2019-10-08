const Cartinfo = require("../models/cartinfo");
const Customers = require("../models/customers");


exports.checkProduct = (req, res, next) => {
    Cartinfo.find( { 'sessionInfo.email': req.body.email }).then(prods => {
        res.status(200).json({
          productsInCart: prods
        });
    });
};

exports.orderProducts = (req, res, next) => {
    Cartinfo.find( { 'sessionInfo.email': req.body.sessionInfo.email }, function (err, cartDt) {
        if (cartDt && cartDt.length > 0) {
          if (cartDt[0].sessionInfo.email === req.body.sessionInfo.email) {
            const cartAgain = {
                            productId: req.body.productsInfo.ProductId,
                            subCategory: req.body.productsInfo.SubCategory,
                            category: req.body.productsInfo.Category,
                            supplierName: req.body.productsInfo.SupplierName,
                            name: req.body.productsInfo.Name,
                            productPicUrl: req.body.productsInfo.ProductPicUrl,
                            status: req.body.productsInfo.Status,
                            quantity: req.body.productsInfo.Quantity,
                            currencyCode: req.body.productsInfo.CurrencyCode,
                            price: req.body.productsInfo.Price,
                            deliveryPrice: req.body.productsInfo.deliveryPrice
            };
            Cartinfo.updateOne({
                $push: {'cartResponse': cartAgain},
                'sessionInfo.secureToken': req.body.sessionInfo.secureToken,
                }).then(cartLists => {
                    res.status(201).json({
                        cartDetails: {
                            ...cartLists
                        }
                    });
            });
          }
        }
        else {
          const cartJson = new Cartinfo({
                cartResponse: [
                        {
                            productId: req.body.productsInfo.ProductId,
                            subCategory: req.body.productsInfo.SubCategory,
                            category: req.body.productsInfo.Category,
                            supplierName: req.body.productsInfo.SupplierName,
                            name: req.body.productsInfo.Name,
                            productPicUrl: req.body.productsInfo.ProductPicUrl,
                            status: req.body.productsInfo.Status,
                            quantity: req.body.productsInfo.Quantity,
                            currencyCode: req.body.productsInfo.CurrencyCode,
                            price: req.body.productsInfo.Price,
                            deliveryPrice: req.body.productsInfo.deliveryPrice
                        }
                ],
                sessionInfo: {
                    email: req.body.sessionInfo.email,
                    isLoggedIn: req.body.sessionInfo.isLoggedIn,
                    firstName: req.body.sessionInfo.firstName,
                    middleName: req.body.sessionInfo.middleName,
                    lastName: req.body.sessionInfo.lastName,
                    secureToken: req.body.sessionInfo.secureToken,
                }
          });
          cartJson.save().then(createdCart => {
              res.status(201).json({
                  cartDetails: {
                      ...createdCart
                  }
              });
          })
          .catch(error => {
              res.status(500).json({
              message: "Cart is not saved successfully!"
              });
          });
        }
      
    });
};