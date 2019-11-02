const Customers = require("../models/customers");
const jwt = require("jsonwebtoken");

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
                customerDOB: req.body.customerDOB,
                customerGender: req.body.customerGender,
                customerMobile: req.body.customerMobile
            });
            custs.save().then(createdCusts => {
                res.status(201).json({
                    message: "Registration successful. Please go to login page",
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
    Customers.findOne ( { customerEmail: req.body.customerEmail}, '+customerPass', function (err, custLog) {
        if (custLog) {
            custLog.comparePassword(req.body.customerPass, function (err, isMatch) {
                console.log(custLog,isMatch);
                if (!isMatch) {
                    return res.status(401).json({message: 'Please enter your valid password'});
                } else {
                    const token = jwt.sign(
                        { email: custLog.customerEmail, userFname: custLog.customerFirstName, userMname: custLog.customerMiddleName, userLname: custLog.customerLastName },
                        'hi',
                        { expiresIn: "1h" }
                    );
                    res.status(200).json({
                        token: token,
                        expiresIn: 3600,
                        email: custLog.customerEmail,
                        custFname: custLog.customerFirstName,
                        custMname: custLog.customerMiddleName,
                        custLname: custLog.customerLastName
                    });
                }
            });
        } else {
            res.status(500).json({
                message: "Please enter your valid email id."
            });
        }
    });
};