const mongoose = require('mongoose');

mongoose.connect(
   process.env.DBURI,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   err => {
      if (!err) {
         console.log('MongoDB Connection Succeeded.');
      } else {
         console.log('Error in DB connection: ' + err);
      }
   }
);
