let mongoose = require('mongoose');

// Comment schema
let commentSchema = mongoose.Schema(
    {
        text: String,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            username: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Comment', commentSchema);
