require('dotenv').config();
const cors = require('cors');
const express = require('express');
require('./db');
const usersRoute = require('./routes/user.route');
const platesRoute = require('./routes/plate.route');
const menuRoute = require('./routes/menu.route');
const auth = require('../src/utils/middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersRoute);
app.use('/plates', auth.auth, platesRoute);
app.use('/menus', auth.auth, menuRoute);

app.listen(process.env.PORT, () => {
   console.log(`Server started on port http://localhost:${process.env.PORT}`);
});
