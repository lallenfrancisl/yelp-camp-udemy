let express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// path to the default stylesheets that should be added to every page
let defaultStyles = ['/css/lib/bootstrap-grid.min.css', '/css/main.css', '/css/common.css'],
    defaultScripts = ['/js/common.js'];

// Landing page
app.get('/', (_req, res) => {
    styles = [], scripts = [];
    res.render('index', {
        defaultStyles: defaultStyles,
        styles: styles,
        defaultScripts: defaultScripts,
        scripts: scripts
    });
});

// List all the campgrounds
let campgrounds = [
    {name: 'Sasi\'s Homestay', image: 'dino-reichmuth-5Rhl-kSRydQ-unsplash.jpg'},
    {name: 'Damodarji\'s Pettikkada Camp', image: 'dino-reichmuth-pl1mhwMctJc-unsplash.jpg'},
    {name: 'Subru\'s Camp', image: 'ridwan-kosasih-vXzSkC3-n5I-unsplash.jpg'},
    {name: 'Sasi\'s Homestay', image: 'dino-reichmuth-5Rhl-kSRydQ-unsplash.jpg'},
    {name: 'Damodarji\'s Pettikkada Camp', image: 'dino-reichmuth-pl1mhwMctJc-unsplash.jpg'},
    {name: 'Subru\'s Camp', image: 'ridwan-kosasih-vXzSkC3-n5I-unsplash.jpg'},
    {name: 'Sasi\'s Homestay', image: 'dino-reichmuth-5Rhl-kSRydQ-unsplash.jpg'},
    {name: 'Damodarji\'s Pettikkada Camp', image: 'dino-reichmuth-pl1mhwMctJc-unsplash.jpg'},
    {name: 'Subru\'s Camp', image: 'ridwan-kosasih-vXzSkC3-n5I-unsplash.jpg'},
    {name: 'Sasi\'s Homestay', image: 'dino-reichmuth-5Rhl-kSRydQ-unsplash.jpg'},
    {name: 'Damodarji\'s Pettikkada Camp', image: 'dino-reichmuth-pl1mhwMctJc-unsplash.jpg'},
    {name: 'Subru\'s Camp', image: 'ridwan-kosasih-vXzSkC3-n5I-unsplash.jpg'},
    {name: 'Sasi\'s Homestay', image: 'dino-reichmuth-5Rhl-kSRydQ-unsplash.jpg'},
    {name: 'Damodarji\'s Pettikkada Camp', image: 'dino-reichmuth-pl1mhwMctJc-unsplash.jpg'},
    {name: 'Subru\'s Camp', image: 'ridwan-kosasih-vXzSkC3-n5I-unsplash.jpg'}
];

// campgrounds page
app.get('/campgrounds', (_req, res) => {
    styles = [], scripts = [];
    styles.push('/css/campgrounds.css')
    res.render('campgrounds', {
        defaultStyles: defaultStyles,
        styles: styles,
        defaultScripts: defaultScripts,
        scripts: scripts,
        campgrounds: campgrounds
    });
});

// add new campground to the list
app.post('/campgrounds', (req, res) => {
    // get data from form and add to campgrounds list
    let name = req.body.name, image = req.body.image;
    campgrounds.push({name, image});

    // redirect to campgrounds page
    res.redirect('campgrounds');
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


const IP = '0.0.0.0', PORT = 3000;
app.listen(PORT, IP, () => {
    console.log('Server has started at http://' + IP + ':' + PORT);
});
