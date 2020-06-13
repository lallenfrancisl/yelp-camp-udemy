let express = require('express'),
    router = express.Router(),
    // Campground model
    Campground = require('../models/campground'),
    // Comment model
    Comment = require('../models/comment');


// campgrounds page
router.get('/campgrounds', (_req, res) => {
    styles = [], scripts = [];
    styles.push('/css/campgrounds.css')

    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.error(err);
        }
        else {
            res.render('campgrounds/campgrounds', {
                styles: styles,
                scripts: scripts,
                campgrounds: campgrounds
            });
        }
    });
});

// add new campground to the list
router.post('/campgrounds', isLoggedIn, (req, res) => {
    // create new campground in the database
    // with the name and image url from the form
    Campground.create(
    {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user.id,
            username: req.user.username
        }
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
router.get('/campgrounds/new', isLoggedIn, (req, res) => {
    styles = [], scripts = [];
    styles.push('/css/new-camp.css')
    res.render('campgrounds/new-camp', {
        styles: styles,
        scripts: scripts
    });
});

// show detail about each campground
router.get('/campgrounds/:id', (req, res) => {
    styles = [], scripts = [];
    styles.push('/css/show.css')
    Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
        if(err) {
            console.error(err);
        }
        else {
            res.render('campgrounds/show', {
                styles: styles,
                scripts: scripts,
                campground: campground
            })
        }
    });
});

// edit campground route
router.get('/campgrounds/:id/edit', isAuthorizedCampground, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        styles = [], scripts = [];
        styles.push('/css/new-camp.css');
        res.render('campgrounds/edit', {
            scripts: scripts,
            styles: styles,
            campground: campground
        });
    });
});

// update campground route
router.put('/campgrounds/:id', isAuthorizedCampground, (req, res) => {
    // find and update the campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
        if (err) {
            console.error(err);
            res.redirect('/campgrounds/' + req.params.id + '/edit');
        }
        else {
            // redirect to the show campround page
            console.log(campground);
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

// destroy the campground
router.delete('/campgrounds/:id', isAuthorizedCampground, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err, campgroundRemoved) => {
        if(err) {
            console.log(err);
            res.redirect('/campgrounds');
        }
        else {
            Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect("/campgrounds");
            });
        }
    })
});

// logged in checking middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login?returnUrl=' + `${req.protocol}://${req.headers.host}/campgrounds/new`);
}

// authorization middleware
function isAuthorizedCampground(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, campground) => {
            if(err) {
                console.error(err);
                res.redirect('back');
            }
            else {
                // does the user own the campground
                if (campground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    console.error('The campground is not yours');
                    res.redirect('back');
                }
            }
        });
    }
    else {
        console.error('Not authorized to do that');
        res.redirect('back');
    }
}


module.exports = router;
