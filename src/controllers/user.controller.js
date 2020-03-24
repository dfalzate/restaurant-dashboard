const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
   async signup(req, res) {
      try {
         let data = req.body;
         data.password = await bcrypt.hash(data.password, 8);
         await User.create(data);
         res.status(200).send('User was created!');
      } catch (error) {
         res.status(400).send(error);
      }
   },
   async login(req, res) {
      try {
         const user = req.body;
         const result = await User.findOne({ userName: user.userName });
         const isValid = await bcrypt.compare(user.password, result.password);
         if (isValid) {
            const token = jwt.sign({ user }, process.env.SECRET, {
               expiresIn: 1000 * 60 * 60 * 24
            });
            res.status(200).send({ token });
         } else {
            res.status(401).send({ message: 'Check user or password' });
         }
      } catch (error) {
         res.status(400).send(error);
      }
   }
};
