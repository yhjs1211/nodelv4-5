const express = require('express');
const router = express.Router();

// Controller 연결
const postController = require('../controller/PostController.js');

// Auth Middleware
const isAuth = require('../middleware/auth.js');

router.route('/')
// GET /posts
.get(postController.getPosts)
// POST /posts
.post(isAuth,postController.createPost);

router.route('/:_postId')
// GET /posts/:_postId
.get(postController.getPost)
// PUT /posts/:_postId
.put(isAuth,postController.updatePost)
// DELETE /posts/:_postId
.delete(isAuth,postController.deletePost);

module.exports = router;