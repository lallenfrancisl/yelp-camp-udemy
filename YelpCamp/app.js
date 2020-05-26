let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    // Campground model
    Campground = require('./models/campground'),
    seedDB = require('./seeds'),
    // Comment model
    Comment = require('./models/comment'),
    // User model
    User = require('./models/user');

// connect to mongo database
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


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
    next();
});

// seed the database with dummy data
// seedDB();

/**
 * Global variables
 */

// path to the default stylesheets that should be added to every page
let defaultStyles = ['/css/lib/bootstrap-grid.min.css', '/css/common.css'],
    defaultScripts = ['/js/common.js'];

// Home page
app.get('/', (_req, res) => {
    styles = [], scripts = [];
    styles.push('/css/index.css');
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.error(err);
        }
        else {
            res.render('index', {
                defaultStyles: defaultStyles,
                styles: styles,
                defaultScripts: defaultScripts,
                scripts: scripts,
                campgrounds: campgrounds
            });
        }
    });
});

// campgrounds page
app.get('/campgrounds', (_req, res) => {
    styles = [], scripts = [];
    styles.push('/css/campgrounds.css')

    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.error(err);
        }
        else {
            res.render('campgrounds', {
                defaultStyles: defaultStyles,
                styles: styles,
                defaultScripts: defaultScripts,
                scripts: scripts,
                campgrounds: campgrounds
            });
        }
    });
});

// add new campground to the list
app.post('/campgrounds', (req, res) => {
    // create new campground in the database
    // with the name and image url from the form
    Campground.create(
    {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    },
    (err, campground) => {
        if(err) {
            console.error(err);
        }
        else {
            console.log('campground added');
            console.log(campground);
            // redirect to campgrounds page
            res.redirect('campgrounds');
        }
    });
});

// form for adding new campground
app.get('/campgrounds/new', (req, res) => {
    styles = [], scripts = [];
    styles.push('/css/new-camp.css')
    res.render('new-camp.ejs', {
        defaultStyles: defaultStyles,
        styles: styles,
        defaultScripts: defaultScripts,
        scripts: scripts
    });
});

// show detail about each campground
app.get('/campgrounds/:id', (req, res) => {
    styles = [], scripts = [];
    styles.push('/css/show.css')
    Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
        if(err) {
            console.error(err);
        }
        else {
            res.render('show', {
                defaultStyles: defaultStyles,
                styles: styles,
                defaultScripts: defaultScripts,
                scripts: scripts,
                campground: campground
            })
        }
    });
});


// comments Route
app.get('/campgrounds/:id/comments/new', (req, res) => {
    res.send('New comments page');
});

// add new comment post route
app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
    // lookup campground using id
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.error(err);
        }
        else {
            Campground.findById(req.params.id, (err, campground) => {
                if(err) {
                    console.log(err);
                    res.redirect('/campgrounds/' + campground._id);
                }
                else {
                    Comment.create(req.body.comment, (err, comment) => {
                        if(err) {
                            console.error(err);
                        }
                        else {
                            comment.text = comment.text.trim();
                            comment.author = comment.author.trim();
                            campground.comments.push(comment);
                            campground.save();
                            res.redirect('/campgrounds/' + campground._id);
                        }
                    });
                }
            });
        }
    })
});


// =================================
// AUTH ROUTES

// sign up routes
app.get('/register', (req, res) => {
    scripts = [], styles = ['/css/signup.css'];
    res.render('register', {
        defaultStyles: defaultStyles,
        styles: styles,
        defaultScripts: defaultScripts,
        scripts: scripts
    });
});

app.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.error(err);
            if(err.name == 'UserExistsError') {
                res.redirect('/campgrounds');
            }
            else {
                res.redirect('/register');
            }
        }
        else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/campgrounds');
            });
        }
    });
});


// login routes
app.get('/login', (req, res) => {
    scripts = [], styles = ['/css/login.css'];
    res.render('login', {
        defaultStyles: defaultStyles,
        styles: styles,
        defaultScripts: defaultScripts,
        scripts: scripts
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {
});

// logout routes
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});


// logged in checking middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

const IP = '0.0.0.0', PORT = 3000;
app.listen(PORT, IP, () => {
    console.log('Server has started at http://' + IP + ':' + PORT);
});
