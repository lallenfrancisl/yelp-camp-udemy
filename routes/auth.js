let express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    User = require('../models/user');


// =================================
// AUTH ROUTES

// sign up routes
router.get('/register', (req, res) => {
    let returnUrl = req.url.split('returnUrl=');
    if (returnUrl.length < 2) {
        returnUrl = '/';
    }
    else {
        returnUrl = returnUrl[returnUrl.length - 1];
    }

    scripts = [], styles = ['/css/signup.css'];
    res.render('register', {
        styles: styles,
        scripts: scripts,
        returnUrl: returnUrl
    });
});

router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.error(err);
            if(err.name == 'UserExistsError') {
                res.redirect('/login?returnUrl=' + req.url.split('returnUrl=')[1]);
            }
            else {
                res.redirect(req.url);
            }
        }
        else {
            passport.authenticate('local')(req, res, () => {
                res.redirect(req.url.split('returnUrl=')[1]);
            });
        }
    });
});


// login routes
router.get('/login', (req, res) => {
    let returnUrl = req.url.split('returnUrl=');
    if (returnUrl.length < 2) {
        returnUrl = '/';
    }
    else {
        returnUrl = returnUrl[returnUrl.length - 1];
    }

    scripts = [], styles = ['/css/login.css'];
    res.render('login', {
        styles: styles,
        scripts: scripts,
        returnUrl: returnUrl
    });
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect(req.url.split('returnUrl=')[1]);
    // res.redirect('/campgrounds');
});

// logout routes
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('back');
});


module.exports = router;
