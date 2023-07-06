const express = require('express');
const postRouter = require('./post.js');
const userRouter = require('./user.js');
const commentRouter = require('./comment.js');

const router = express.Router();

const defaultRouter = [
    {
        path:'/posts',
        route: postRouter
    },
    {
        path:'/',
        route: userRouter
    },
    {
        path:'/comments',
        route: commentRouter
    }
];

defaultRouter.forEach(r=>{
    router.use(r.path, r.route);
})

module.exports = router;