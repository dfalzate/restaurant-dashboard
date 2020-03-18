const mongoose = require('mongoose');

const platesSchema = new mongoose.Schema(
   {
      ingredients: {
         type: [String],
         required: true
      },
      description: {
         type: String,
         required: true
      },
      menus: {
         type: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }
      }
   },
   { timestamps: true }
);

module.exports = mongoose.model('Plate', platesSchema);
