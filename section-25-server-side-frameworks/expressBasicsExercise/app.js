let express = require("express");
let app = express();

// route '/' should return "Hi there, welcome to my assignment!"
app.get('/', function (req, res) {
    res.send('Hi there, welcome to my assignment!');
});

// route "/speak/:animal" print "The :animal says something"
app.get('/speak/:animal', function (req, res) {
    let sounds = {
        pig: 'Oink',
        cow: 'Moo',
        dog: 'Woof Woof!'
    };
    let animal = req.params.animal.toLowerCase();
    let sound = sounds[animal];
    if (!sound) {
        res.send("That animal doesn't exist in our database, sorry.");
    } else {
        res.send("The " + animal + " says '" + sound + "'");
    }
});

// route '/repeat/:word/:number' should print word number times
app.get('/repeat/:word/:number', function (req, res) {
    let repetitions = Number(req.params.number);
    res.send(req.params.word.repeat(repetitions));
});

//route every other request to error
app.get('*', function (req, res) {
    res.send('Sorry, page not found...What are you doing with your life?');
});

// start listeing for routes on port 3000
app.listen(3000, function () {
    console.log("Server started on port 3000");
});