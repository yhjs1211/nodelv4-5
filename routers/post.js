const express = require('express');
const router = express.Router();

// Controller 연결
const postController = require('../controller/post.js');

// Middleware
const auth = require('../middleware/auth.js');
const validator = require('../middleware/validation.js');


router.route('/')
// GET /posts
.get(postController.getPosts)
// POST /posts
.post(auth.verify,validator.createPost,postController.createPost);

router.route('/:_postId')
// GET /posts/:_postId
.get(postController.getPosts)
// PUT /posts/:_postId
.put(auth.verify,validator.updatePost,postController.updatePost)
// DELETE /posts/:_postId
.delete(auth.verify,postController.deletePost);

module.exports = router;