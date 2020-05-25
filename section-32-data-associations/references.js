let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo_2', { useNewUrlParser: true, useUnifiedTopology: true });

let Post = require('./models/post');

let User = require('./models/user');

User.create({
    email: 'allen@gmail.com',
    name: 'allen francis'
});


Post.create({
    title: 'How to cook 2',
    content: 'gibberish2 gibberish2 gibberish2 gibberish2 gibberish2'
}, (err, post) => {
    User.findOne({email: 'allen@gmail.com'}, (err, foundUser) => {
        foundUser.posts.push(post);
        foundUser.save((err, data) => {
            if(!err) {
                console.log(data);
            }
        });
    });
});

User.findOne({email: 'allen@gmail.com'}).populate('posts').exec((err, user) => {
    if(!err) {
        console.log(user);
    }
});


