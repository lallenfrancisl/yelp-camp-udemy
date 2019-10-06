let express = require('express');
let app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (_req, res) => {
    res.render('home');
});

// fall in love with something page
app.get('/fallinlovewith/:thing', (req, res) => {
    let thing = req.params.thing;
    res.render('love', {
        thingVar: thing
    });
});

app.get('/posts', (req, res) => {
    let posts = [
        {title: 'Post 1', author: 'Allen'},
        {title: 'Post 2', author: 'Allen'}
    ];

    res.render('posts', {posts: posts});
});


//Start server on port 3000
const PORT = 3000, IP = '0.0.0.0';
app.listen(PORT, IP, () => {
    console.log('Server started at http://0.0.0.0:3000');
})
