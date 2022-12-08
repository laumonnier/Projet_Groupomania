// Dependency used and tools of library concerning the server
const express = require('express');// Ability to access the body of the query
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path =require('path');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors = require('cors');
const app = express();

// router require
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');



// connecting the Database and the environment variable
require('dotenv').config({path: './config/.env'});
require('./config/db');

// Ability to access the body of the query
app.use(express.json());

//Helmet helps us secure our Express applications by defining various HTTP headers
//Helmet helps us secure our applications against XSS attacks
app.use(helmet());

// Accepts all clients at the site
// Addition of "headers" allowing communication between different port servers
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));

// BodyParser will allow us to transfer requests from one point to another
// cookieParser will be used to read cookies properly and can be decoded 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//Each time we make a request, this will allow us to check whether the user is entitled or not
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(201).send(res.locals.user._id)
});

// Additions of the various endpoints (Additions the differents routes)
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// Exporting the "app"
module.exports = app;