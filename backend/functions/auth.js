require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.jwt_secret;


  
exports.authUser = (req, res, next) => {
    try {
      let token = req.cookies.token;
      // console.log(token);
      if (token) {
        
        let decoded = jwt.verify(token, jwtSecret);
        if (decoded.email) {
          req.body.email = decoded.email;
          next();
        } else {
          res.status(401).json({err:{msg:"authentucation error"}});
        }
      } else {
        res.status(401).json({err:{msg:"authentucation error"}});
      }
    } catch (err) {
      console.log(err);
      res.status(401).json({err:{msg:"authentucation error"}});
    }
    // console.log(decoded);
  };