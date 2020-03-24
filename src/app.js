const cors = require('cors');
require('dotenv').config();
const express = require('express');
const { mongoose } = require('./db');
const userRoute = require('./routes/user.route');
const plateRoute = require('./routes/plate.route');
const menuRoute = require('./routes/menu.route');
const { login } = require('./utils/midLogin');
const { user } = require('./utils/midUser');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoute);
app.use('/plates', login, user, plateRoute);
app.use('/menus', login, user, menuRoute);

module.exports = { app, mongoose };
