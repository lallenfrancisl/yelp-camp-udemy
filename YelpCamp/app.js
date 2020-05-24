let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// connect to mongo database
mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// schema setup
let campgroungSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model('Campground', campgroungSchema);

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
    Campground.findById(req.params.id, (err, campground) => {
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


const IP = '0.0.0.0', PORT = 3000;
app.listen(PORT, IP, () => {
    console.log('Server has started at http://' + IP + ':' + PORT);
});
