let express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    localStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user');

// connect to mongo database
mongoose.connect('mongodb://localhost/auth_demo_app', { useNewUrlParser: true, useUnifiedTopology: true });


let app = express();

app.use(require('express-session')({
    secret: 'this is the firat app with auth',
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ROUTES
// =============================

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret',isLoggedIn, (req, res) => {
    res.render('secret');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err) {
            console.error(err);
            res.redirect('/register');
        }
        else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secret');
            });
        }
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login',
    }),
    (req, res) => {
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}


app.listen('3000', '0.0.0.0', () => {
    console.log('https://0.0.0.0:3000');
});
