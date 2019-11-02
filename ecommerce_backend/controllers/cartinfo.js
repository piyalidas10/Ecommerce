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
                            productId: req.body.productsInfo._id,
                            subCategory: req.body.productsInfo.SubCategory,
                            category: req.body.productsInfo.Category,
                            supplierName: req.body.productsInfo.SupplierName,
                            name: req.body.productsInfo.Name,
                            productPicUrl: req.body.productsInfo.ProductPicUrl,
                            status: req.body.productsInfo.Status,
                            quantity_in_stock: req.body.productsInfo.Quantity,
                            currencyCode: req.body.productsInfo.CurrencyCode,
                            price: req.body.productsInfo.Price,
                            deliveryPrice: req.body.productsInfo.deliveryPrice,
                            price_payable: req.body.productsInfo.Price
            };
            Cartinfo.findOneAndUpdate(
                { 'sessionInfo.email': req.body.sessionInfo.email },
                { $push: {'cartResponse': cartAgain} },
                { $set: {'sessionInfo.secureToken': req.body.sessionInfo.secureToken} }
                ).then(cartLists => {
                    console.log(cartLists);
                    res.status(201).json({
                        cartDetails: {
                            ...cartLists
                        }
                    });
                })
                .catch(error => {   
                    console.log(error.errmsg);
                    res.status(500).json({
                        message: error.errmsg
                    });
                });
          }
        }
        else {
          const cartJson = new Cartinfo({
                cartResponse: [
                        {
                            productId: req.body.productsInfo._id,
                            subCategory: req.body.productsInfo.SubCategory,
                            category: req.body.productsInfo.Category,
                            supplierName: req.body.productsInfo.SupplierName,
                            name: req.body.productsInfo.Name,
                            productPicUrl: req.body.productsInfo.ProductPicUrl,
                            status: req.body.productsInfo.Status,
                            quantity_in_stock: req.body.productsInfo.Quantity,
                            currencyCode: req.body.productsInfo.CurrencyCode,
                            price: req.body.productsInfo.Price,
                            deliveryPrice: req.body.productsInfo.deliveryPrice,
                            price_payable: req.body.productsInfo.Price
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
            console.log(error);
              res.status(500).json({
              message: "Cart is not saved successfully!"
              });
          });
        }
      
    });
};


// exports.addProductQantity = (req, res, next) => {
//     Cartinfo.find( { 'sessionInfo.email': req.body.email }, {'cartResponse': {$elemMatch: {productId: req.body.id}}}).then(prodLists => {
//         console.log(prodLists);
//         Cartinfo.updateOne({
//             $set: {'qauntity_buy': req.body.qty}
//         }).then(cartChanges => {
//                 res.status(201).json({
//                     productDetails: {
//                         ...cartChanges
//                     }
//                 });
//         })
//         .catch(error => {
//               res.status(500).json({
//               message: "Cart is not updated successfully!"
//               });
//         });
//     });
// };

exports.addProductQantity = (req, res, next) => {
    Cartinfo.updateOne(
        { 'sessionInfo.email': req.body.email, 'cartResponse.productId': req.body.id },
        { $set : {'cartResponse.$.qauntity_buy': req.body.qty, 'cartResponse.$.price_payable': req.body.price * req.body.qty} }
    ).then(prodLists => {
        res.status(201).json({
            qauntity_change: true
        });
    });
};

exports.deleteProductQantity = (req, res, next) => {
    Cartinfo.updateOne( 
        { 'sessionInfo.email': req.body.email, 'cartResponse.productId': req.body.id },
        { $set : {'cartResponse.$.qauntity_buy': req.body.qty, 'cartResponse.$.price_payable': req.body.price * req.body.qty} }
    ).then(prodLists => {
        res.status(201).json({
            qauntity_change: true
        });
    });
};

exports.removeProduct = (req, res, next) => {
    Cartinfo.deleteOne( 
        { 'sessionInfo.email': req.body.email, 'cartResponse.productId': req.body.id }
    ).then(prodLists => {
        res.status(201).json({
            qauntity_change: true
        });
    });
};