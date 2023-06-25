const express = require('express');
const router = express.Router();

// Controller 연결
const postController = require('../controller/PostController.js');

// Middleware
const isAuth = require('../middleware/auth.js');
const validator = require('../middleware/validation.js');


router.route('/')
// GET /posts
.get(postController.getPosts)
// POST /posts
.post(isAuth,validator.validateCreatePost,postController.createPost);

router.route('/:_postId')
// GET /posts/:_postId
.get(postController.getPosts)
// PUT /posts/:_postId
.put(isAuth,validator.validateUpdatePost,postController.updatePost)
// DELETE /posts/:_postId
.delete(isAuth,postController.deletePost);

module.exports = router;