let express = require('express'),
    router = express.Router(),
    // Campground model
    Campground = require('../models/campground'),
    // Comment model
    Comment = require('../models/comment');

// comments Route
router.get('/campgrounds/:id/comments/new', (req, res) => {
    res.send('New comments page');
});

// add new comment post route
router.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
    // lookup campground using id
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.error(err);
        }
        else {
            Campground.findById(req.params.id, (err, campground) => {
                if(err) {
                    console.log(err);
                    res.redirect('/campgrounds/' + campground._id);
                }
                else {
                    Comment.create(req.body.comment, (err, comment) => {
                        if(err) {
                            console.error(err);
                        }
                        else {
                            // add username and id to the comment
                            comment.author.id = req.user._id;
                            comment.author.username = req.user.username;
                            comment.text = comment.text.trim();
                            comment.save();
                            campground.comments.push(comment);
                            campground.save();
                            res.redirect('/campgrounds/' + campground._id);
                        }
                    });
                }
            });
        }
    });
});

// edit comment form
router.get('/campgrounds/:id/comments/:commentId/edit', isAuthorizedCampground, (req, res) => {
    Comment.findById(req.params.commentId, (err, foundComment) => {
        if(err) {
            console.error(err);
            res.redirect('/campgrounds');
        }
        else {
            console.log(foundComment);
            res.render('comments/edit', {
                campground_id: req.params.id,
                comment: foundComment
            });
        }
    });
});

// update comments
router.put('/campgrounds/:id/comments/:commentId', isAuthorizedCampground, (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err, updatedComment) => {
        if (err) {
            console.log(err);
            res.redirect('back');
        }
        else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});


// delete comments
router.delete('/campgrounds/:id/comments/:commentId', isAuthorizedCampground, (req, res) => {
    Comment.findByIdAndDelete(req.params.commentId, (err) => {
        if (err) {
            console.error(err);
        }
        res.redirect('back');
    });
});


// logged in checking middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// authorization middleware
function isAuthorizedCampground(req, res, next) {
    // is user logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentId, (err, foundComment) => {
            if(err) {
                console.error(err);
                res.redirect('back');
            }
            else {
                // does the user own the comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    console.error('The comment is not yours');
                    res.redirect('back');
                }
            }
        });
    }
    else {
        console.error('Not authorized to do that');
        res.redirect('back');
    }
}


module.exports = router;
