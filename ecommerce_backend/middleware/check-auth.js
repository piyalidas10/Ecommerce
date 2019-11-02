const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  console.log(decodedToken);
  try {
    // const token = req.headers.authorization.split(" ")[1];
    // const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.customerData = { 
      email: decodedToken.customerEmail,
      custFname: decodedToken.customerFirstName,
      custMname: decodedToken.customerMiddleName,
      custLname: decodedToken.customerLastName
    };
    console.log(req.customerData);
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
