// Dependency used and tools of library concerning the server
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// router require
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

require('dotenv').config({path: './config/.env'});
require('./config/db');



const app = express();

//Helmet helps us secure our Express applications by defining various HTTP headers
//Helmet helps us secure our applications against XSS attacks
app.use(helmet());

// Addition of "headers" allowing communication between different port servers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

// BodyParser will allow us to transfer requests from one point to another
// cookieParser will be used to read cookies properly and can be decoded 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Additions of the various endpoints (Additions the differents routes)
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Listening on port
app.listen(process.env.MY_PORT, () => {
    console.log(`Listening on port ${process.env.MY_PORT}`);
})