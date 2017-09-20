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

  //requiring routes
var commentRoutes    = require('./routes/comments'),
    tutorialRoutes   = require('./routes/tutorials'),
    indexRoutes      = require('./routes/index');

var url = process.env.DATABASEURL || "localhost:27017/qtorial";
mongoose.connect(url);

  //set up view engine
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

  //handlebars logic helpers
handlebars.registerHelper('helper', function (v1, operator, v2, options) {
    switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
})

hbs.create({
    helpers: {
        ifCond: function (v1, operator, v2, options) {
            switch (operator) {
                case '==':
                    return (v1 == v2) ? options.fn(this) : options.inverse(this);
                case '===':
                    return (v1 === v2) ? options.fn(this) : options.inverse(this);
                case '!=':
                    return (v1 != v2) ? options.fn(this) : options.inverse(this);
                case '!==':
                    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                case '<':
                    return (v1 < v2) ? options.fn(this) : options.inverse(this);
                case '<=':
                    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                case '>':
                    return (v1 > v2) ? options.fn(this) : options.inverse(this);
                case '>=':
                    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                case '&&':
                    return (v1 && v2) ? options.fn(this) : options.inverse(this);
                case '||':
                    return (v1 || v2) ? options.fn(this) : options.inverse(this);
                default:
                    return options.inverse(this);
            }
        }
    }
})

app.use(methodOverride('_method'));
app.use(flash());

  //PASSPORT CONFIG
app.use(require('express-session')({
    secret: "Toejam and Earl",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use(tutorialRoutes);
app.use(commentRoutes);