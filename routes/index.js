let express = require('express'),
    router = express.Router(),
    // Campground model
    Campground = require('../models/campground');

// Home page
router.get('/', (_req, res) => {
    styles = [], scripts = [];
    styles.push('/css/index.css');
    Campground.find({}, (err, campgrounds) => {
        if(err) {
            console.error(err);
        }
        else {
            res.render('index', {
                styles: styles,
                scripts: scripts,
                campgrounds: campgrounds
            });
        }
    });
});


module.exports = router;
