const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();

// BodyParser will allow us to transfer requests from one point to another
// cookieParser will be used to read cookies properly and can be decoded 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Additions of the various endpoints
app.use('/api/user', userRoutes);

// Listening on port
app.listen(process.env.MY_PORT, () => {
    console.log(`Listening on port ${process.env.MY_PORT}`);
})