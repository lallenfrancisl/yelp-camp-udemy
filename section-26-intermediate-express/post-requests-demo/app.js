let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

let friends = ['John', 'Smith', 'Hello'];

app.get('/', (_req, res) => {
    res.render('home');
});

app.get('/friends', (req, res) => {
    res.render('friends', {
        friends: friends
    });
});

app.post('/add-friend', (req, res) => {
    friends.push(req.body['new-friend']);
    res.redirect('/friends');
});


app.listen(3000, '0.0.0.0', () => {
    console.log('Server has started at http://0.0.0.0:3000');
});
