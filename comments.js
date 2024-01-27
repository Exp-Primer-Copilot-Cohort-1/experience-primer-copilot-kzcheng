// Create web server

// Require modules
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Require files
const Comment = require('../models/comment');
const config = require('../config/database');

// Create comment
router.post('/create-comment', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let newComment = new Comment({
        username: req.body.username,
        comment: req.body.comment,
        date: req.body.date
    });

    Comment.addComment(newComment, (err, comment) => {
        if(err) {
            res.json({success: false, msg: 'Failed to create comment'});
        } else {
            res.json({success: true, msg: 'Comment created'});
        }
    });
});

// Get comments
router.get('/get-comments', (req, res, next) => {
    Comment.getComments((err, comments) => {
        if(err) {
            res.json({success: false, msg: 'Failed to get comments'});
        } else {
            res.json({success: true, comments: comments});
        }
    });
});

// Export router
module.exports = router;