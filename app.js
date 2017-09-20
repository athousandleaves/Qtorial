var express               = require('express'),
    app                   = express(),
    bodyParser            = require('body-parser'),
    cookieParser          = require('cookie-parser'),
    mongoose              = require('mongoose'),
    handlebars            = require('handlebars'),
    hbs                   = require('express-handlebars'),
    flash                 = require('connect-flash'),
    methodOverride        = require('method-override'),
    passport              = require('passport'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    request               = require('request'),
    Tutorial              = require('./models/tutorial'),
    Comment               = require('./models/comment'),
    User                  = require('./models/user'),
    middleware            = require('./middleware/index');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
  //serve CSS directory
app.use(express.static(__dirname + "/public"));