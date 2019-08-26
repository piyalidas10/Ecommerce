const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.customerData = { email: decodedToken.customerEmail, username: decodedToken.customerFirstName };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
