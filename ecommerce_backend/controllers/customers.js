const Customers = require("../models/customers");

exports.createCustomers = (req, res, next) => {
    Customers.find( { $or: [{ customerEmail: req.body.customerEmail}, {customerMobile: req.body.customerMobile}]}, function (err, custItems) {
        // Make sure user doesn't already exist
        if (custItems && custItems.length > 0) {
            if (custItems[0].customerEmail === req.body.customerEmail) {
                console.log(custItems[0].customerEmail);
                return res.status(400).send({ message: "The Email Id you have entered is already associated with another account." });
            } else {
                console.log(custItems[0].customerMobile);
                return res.status(400).send({ message: "The Mobile No. you have entered is already associated with another account." });
            }
        }
        else {
            const custs = new Customers({
                customerEmail: req.body.customerEmail,
                customerPass: req.body.customerPass,
                customerFirstName: req.body.customerFirstName,
                customerMiddleName: req.body.customerMiddleName,
                customerLastName: req.body.customerLastName,
                customerMobile: req.body.customerMobile
            });
            custs.save().then(createdCusts => {
                res.status(201).json({
                    message: "Customer added successfully",
                    custlists: {
                        ...createdCusts
                    }
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                message: "Registration is not successfull!"
                });
            });
        }

    });
};

exports.loginCustomer = (req, res, next) => {
    Customers.find ( { $and: [{ customerEmail: req.body.customerEmail}, {customerMobile: req.body.customerMobile}]}, function (err, custItems) {
        
    });
};