let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');


// =================================
// AUTH ROUTES

// sign up routes
router.get('/register', (req, res) => {
    scripts = [], styles = ['/css/signup.css'];
    res.render('register', {
        styles: styles,
        scripts: scripts
    });
});

router.post('/register', (req, res) => {
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
router.get('/login', (req, res) => {
    scripts = [], styles = ['/css/login.css'];
    res.render('login', {
        styles: styles,
        scripts: scripts
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {
});

// logout routes
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});


module.exports = router;
