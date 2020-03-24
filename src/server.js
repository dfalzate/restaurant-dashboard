require('dotenv').config();
const { app } = require('./app');

app.listen(process.env.PORT, () => {
   console.log(`Server started on port http://localhost:${process.env.PORT}`);
});
