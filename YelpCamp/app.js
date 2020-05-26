let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    // Campground model
    Campground = require('./models/campground'),
    seedDB = require('./seeds'),
    // Comment model
    Comment = require('./models/comment'),
    // User model
    User = require('./models/user');

// connect to mongo database
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'This is Yel#$QpCamps se!@#%^:"ssion key #$@%#^&',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.user = req.user;
    // path to the default stylesheets that should be added to every page
    res.locals.defaultStyles = ['/css/lib/bootstrap-grid.min.css', '/css/common.css'],
    res.locals.defaultScripts = ['/js/common.js'];
    next();
});

// seed the database with dummy data
// seedDB();

let indexRoutes = require('./routes/index'),
    campgroundRoutes = require('./routes/campgrounds'),
    commentsRoutes = require('./routes/comments'),
    authRoutes = require('./routes/auth');


app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentsRoutes);
app.use(authRoutes);

const IP = '0.0.0.0', PORT = 3000;
app.listen(PORT, IP, () => {
    console.log('Server has started at http://' + IP + ':' + PORT);
});
