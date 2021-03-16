const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
      if(err) return res.status(401).json({ message: "You shall not pass!" });

      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(400).json({ message: "please provide token"});
  }
}

module.exports = isAuth;