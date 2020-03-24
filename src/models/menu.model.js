const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true
      },
      display: {
         type: Boolean,
         required: true
      },
      plates: {
         type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plate' }],
         required: true
      }
   },
   { timestamps: true }
);

module.exports = mongoose.model('Menu', menuSchema);
