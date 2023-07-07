const express = require('express');
const router = express.Router();

// Controller 연결
const PostController = require('../controller/post.js');
const postController = new PostController();

// Middleware
const auth = require('../middleware/auth.js');
const validator = require('../middleware/validation.js');


router.route('/')
// GET /posts
.get(postController.getPosts)
// POST /posts
.post(auth.verify,validator.createPost,postController.createPost);

router.route('/:postId/like')
.put(auth.verify,postController.likePost);

router.get('/like',auth.verify,postController.getPostsByLike);

router.route('/:postId')
// GET /posts/:postId
.get(postController.getPost)
// PUT /posts/:postId
.put(auth.verify,validator.updatePost,postController.updatePost)
// DELETE /posts/:postId
.delete(auth.verify,postController.deletePost);

module.exports = router;