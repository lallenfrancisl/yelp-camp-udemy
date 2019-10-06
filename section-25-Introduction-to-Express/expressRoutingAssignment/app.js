let express = require('express');
let app = express();


// Visiting / => "Hi there, welcome to my assignment"
app.get('/', (_req, res) => {
    res.send('Hi there, Welcome to my assignment');
});

// Visiting /speak/:animal should print "The animal says 'it's sound'"
let animalSounds = {
    pig: 'Oink',
    cow: 'Moo',
    dog: 'Woof Woof!'
};
app.get('/speak/:animal', (req, res) => {
    let animal = req.params.animal.toLowerCase();

    /**
     * Visiting /speak/pig should print "The pig says 'Oink'"
     * Visiting /speak/cow should print "The cow says 'Moo'"
     * Visiting /speak/dog should print "The dog says 'Woof Woof!'"
     */
    if (animal in animalSounds) {
        res.send('The ' + animal + ' says \'' + animalSounds[animal] + '\'');
    }
    else {
        res.send('That is an unknown animal!!! What is it ?');
    }
});

// Visiting /repeat/text/repetitions should print text repetitions number of times
app.get('/repeat/:text/:reps', (req, res) => {
    let text = req.params.text, reps = req.params.reps;

    res.send((text + ' ').repeat(reps));
});

// Any other route prints "Sorry, page not found... What are you doing with your life ?"
app.get('*', (_req, res) => {
    res.send('Sorry, page not found... What are you doing with your life ?');
});


// Start server at port 3000
const PORT = 3000, IP = '0.0.0.0';
app.listen(PORT, IP, () => {
    console.log('Server started at', 'http://' + IP + ':' + PORT);
});
