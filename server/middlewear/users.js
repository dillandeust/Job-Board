// middleware/users.js
const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (req, res, next) => {
    // email min length 3
    if (!req.body.email || req.body.email.length < 3) {
      return res.status(400).send({
        msg: 'Please enter a email with min. 3 chars'
      });
    }
    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }
    // password (repeat) does not match
    if (
      !req.body.password_confirm ||
      req.body.password != req.body.password_confirm
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }
    next();
  }

  
};


// module.exports = {
// isLoggedIn: (req, res, next) => {
//     try {
//       const token = req.headers.authorization.split(' ')[1];
//       const decoded = jwt.verify(
//         token,
//         'SECRETKEY'
//       );
//       req.userData = decoded;
//       next();
//     } catch (err) {
//       return res.status(401).send({
//         msg: 'Your session is not valid!'
//       });
//     }
//   }
// };