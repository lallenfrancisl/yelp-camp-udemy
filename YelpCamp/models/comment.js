let mongoose = require('mongoose');

// Comment schema
let commentSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model('Comment', commentSchema);
