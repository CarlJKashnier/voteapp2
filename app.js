var dotenv = require('dotenv').config();
var sanatize = require('sanitize-caja');
var express = require('express');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');
var morgan = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongostore')(session);
var helmet = require('helmet');
//Change
//Connect to Database
mongoose.connect(process.env.MLAB_URI);
app.use(helmet());
//Dev logging
app.use(morgan('dev'));
//URL decoding
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Session memory
app.use(session ({
    cookie: {
      maxAge: 691200000,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    secret: 'Shhh, its the secret',
    saveUninitialized: true,
    resave: true
}))
//user login initialization
app.use(passport.initialize());
app.use(passport.session());

require('./routes.js')(app, passport);
app.use(express.static('public'));
require('./passport.js')(passport);

//server listen
var server = app.listen(process.env.PORT || 8888);
// debug
console.log("Server is running on port: " + (process.env.PORT || 8888))
