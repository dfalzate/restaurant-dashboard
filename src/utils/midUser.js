const jwt = require('jsonwebtoken');
module.exports = {
   user(req, res, next) {
      const token = req.headers.authorization;
      const user = jwt.decode(token, process.env.SECRET);
      return user.user.type === 'Admin'
         ? next()
         : res.status(400).send('User is not an Administrator');
   }
};
