/**
 * General search:
 * http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb

    Search with Movie ID:
    http://www.omdbapi.com/?i=tt3896198&apikey=thewdb
 */

let express = require('express'),
    app = express(),
    request = require('request');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('search');
});

app.get('/results', (req, res) => {
    let bodyObj = null;
    let url = 'http://www.omdbapi.com/?s=' + req.query.search.toLowerCase() + '&apikey=thewdb';
    request(
        url,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                bodyObj = JSON.parse(body);
                console.log('Response received');
                res.render('results', {
                    results: bodyObj
                });
            }
            else {
                res.render('results', {
                    results: {Search: [{Title: 'Could not get search results'}]}
                });
            }
        }
    );
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server has started on http://0.0.0.0:3000');
});
