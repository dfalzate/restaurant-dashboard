const jwt = require('jsonwebtoken');
module.exports = {
   auth(req, res, next) {
      const token = req.headers.authorization;
      if (token) {
         const check = jwt.verify(token, process.env.SECRET, err => {
            return err ? false : true;
         });
         check ? next() : res.status(401).send('Bad token');
      } else {
         res.status(401).send('Your session has expired');
      }
   }
};
