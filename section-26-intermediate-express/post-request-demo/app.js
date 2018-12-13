let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

let friends = ['gifty', 'kala', 'ashaan', 'khushbu', 'anandhu', ,'abhiraj', 'sachi', 'mathu', 'james', 'sandhi', 'abhishek'];

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/friends', function(req, res) {
    res.render('friends', {friends: friends});
});

app.post('/add-friend', function(req, res) {
    let newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect('/friends');
});

app.get('*', function(req, res) {
    res.send('<h1>SADLY THAT PAGE DOES NOT EXIST!!!!</h1>');
});

app.listen(3000, function() {
    console.log('Server has started on 3000');
});