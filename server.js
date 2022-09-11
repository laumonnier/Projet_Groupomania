const express = require('express');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();

//Listening on port
app.listen(process.env.MY_PORT, () => {
    console.log(`Listening on port ${process.env.MY_PORT}`);
})