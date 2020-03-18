const mongoose = require('mongoose');

//const regex = new RegExp('RegExp expression');

const userSchema = new mongoose.Schema(
   {
      userName: {
         type: String,
         required: true,
         validate: [
            {
               validator: async value => {
                  return await mongoose.models.User.findOne({
                     userName: value
                  }).then(user => {
                     return !user;
                  });
               },
               message: 'El usuario ya existe'
            }
         ]
      },
      name: {
         type: String,
         required: true
      },
      lastName: {
         type: String,
         required: true
      },
      type: {
         type: String,
         required: true,
         enum: ['Admin', 'Costumer']
      },
      password: {
         type: String,
         required: true
      }
   },
   { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
