let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog_demo');


// POST - titel and comment
let postSchema = new mongoose.Schema({
    title: String,
    content: String
});

let Post = mongoose.model('Post', postSchema);

// USER
let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

let User = mongoose.model('User', userSchema);


// let newUser = new User({
//     email: 'gho@example.com',
//     name: 'gho gho'
// });

// newUser.posts.push({
//     title: 'Some strange title',
//     content: 'Post is about nothing'
// })

// newUser.save((err, user) => {
//     if(!err) {
//         console.log(user);
//     }
// });

User.findOne({name: 'gho gho'}, (err, user) => {
    if(!err) {
        console.log(user);
        user.posts.push({
            title: '3 things to hate',
            content: 'blah blah blah'
        });

        user.save((err, post) => {
            if(!err) {
                console.log(post);
            }
        });
    }
});

// let newPost = new Post({
//     title: 'Other gibberish title',
//     comment: 'shittuy as hell'
// });

// newPost.save((err, post) => {
//     if(!err) {
//         console.log(post);
//     }
// });
