let mongoose = require('mongoose');

// POST - titel and comment
let postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports = mongoose.model('Post', postSchema);
