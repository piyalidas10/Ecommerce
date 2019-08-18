const Customers = require("../models/customers");

exports.createCustomers = (req, res, next) => {
    Customers.findOne({ customerEmail: req.body.customerEmail }, function (err, exitsEmail) {
        // Make sure user doesn't already exist
        if (exitsEmail) {
            return res.status(400).send({ message: "The email address you have entered is already associated with another account." });
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