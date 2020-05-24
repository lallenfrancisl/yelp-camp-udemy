let express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOver = require('method-override'),
    sanitizer = require('express-sanitizer');


// mongo/app config
mongoose.connect('mongodb://localhost/restful_blog', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOver('_method'));
app.use(sanitizer());


// Mongoose/model config
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

let Blog = mongoose.model('Blog', blogSchema);

/**
 * Global variables
 */

// path to the default stylesheets that should be added to every page
let defaultStyles = ['/css/lib/bootstrap-grid.min.css', '/css/common.css', '/css/navbar.css'],
    defaultScripts = ['/js/common.js', '/js/navbar.js'];


// restful routes

// root route redirect to /blogs
app.get('/', (req, res) => {
    res.redirect('/blogs');
});


// blogs list route
app.get('/blogs', (req, res) => {
    scripts = [], styles = [];
    styles.push('/css/index.css');
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.error(err);
        }
        else {
            res.render('index', {
                defaultStyles: defaultStyles,
                defaultScripts: defaultScripts,
                blogs: blogs
            });
        }
    });
});


// form to create new blog post
app.get('/blogs/new', (req, res) => {
    scripts = [], styles = [];
    styles.push('/css/new-blog.css')
    res.render('new-blog', {
        defaultScripts: defaultScripts,
        defaultStyles: defaultStyles,
        styles: styles,
        scripts: defaultScripts
    })
});


// post route for submitting new blogs
app.post('/blogs', (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // create blog
    Blog.create(req.body.blog, (err, blog) => {
        if(err) {
            console.error(err);
            res.redirect('/blogs/new');
        }
        else {
            // redirect to blogs
            res.redirect('/blogs');
        }
    })
});


// show blog post route
app.get('/blogs/:id', (req, res) => {
    scripts = [], styles = [];
    styles.push('/css/show.css');
    Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            console.error(err);
            res.redirect('/blogs');
        }
        else {
            res.render('show', {
                defaultStyles: defaultStyles,
                defaultScripts: defaultScripts,
                scripts: scripts,
                styles: styles,
                blog: blog
            })
        }
    });
});


// edit route
app.get('/blogs/:id/edit', (req, res) => {
    scripts = [], styles = [];
    styles.push('/css/edit.css');
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findById(req.params.id, (err, blog) => {
        if(err) {
            console.error(err);
        }
        else {
            res.render('edit', {
                defaultStyles: defaultStyles,
                defaultScripts: defaultScripts,
                scripts: scripts,
                styles: styles,
                blog: blog
            });
        }
    });
});


app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) {
            res.redirect('/blogs');
        }
        else {
            res.redirect('/blogs/' + req.params.id);
        }
    })
});


// delete route
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.error(err);
            res.redirect('/blogs');
        }
        else {
            res.redirect('/blogs');
        }
    });
});

// start the server on
app.listen('3000', '0.0.0.0', () => {
    console.log('Server has started at http://0.0.0.0:3000');
});
