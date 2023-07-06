const express = require('express');
const router = express.Router();

// Controller
const CommentController = require('../controller/comment.js');
const commentController = new CommentController();

// middleware
const auth = require('../middleware/auth.js');
const validator = require('../middleware/validation.js');

router.route('/')
.get(commentController.getComments)
.post(auth.verify,validator.createComment,commentController.createComment)
.put(auth.verify,validator.updateComment,commentController.updateComment)
.delete(auth.verify,commentController.deleteComment);

module.exports=router;