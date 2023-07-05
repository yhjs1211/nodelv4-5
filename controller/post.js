const PostService = require('../service/post.js');


class PostController{
    constructor(){
        this.postService = new PostService();
    }
    createPost = async (req, res) => {
        const created = await this.postService.createPost(
            req.body,
            res.locals.foundUser
            );

        if(created){
            res.status(201).json({
                created,
                message:"게시글이 생성되었습니다."
            });
        }else{
            res.status(400).json({
                message:"게시글 생성에 실패하였습니다."
            });
        }
    }
    getPosts = async (req, res) => {
        const query = req.query;
        
        let posts;
        if(Object.entries(query).length==0){
            posts = await this.postService.getPosts();
        }else{
            if(query.userId){
                posts = await this.postService.getPosts(query.userId);
            }else{
                return res.status(400).json({
                    message:"올바르지 못한 입력값입니다."
                });
            }
        }

        if(posts.length){
            res.status(200).json({
                posts,
                message:"게시글 목록 조회에 성공하였습니다."
            });
        }else{
            res.status(400).json({
                message:"게시글 목록 조회에 실패하였습니다."
            });
        }
    };
    getPost = async (req, res, next) => {
        const postId = req.params.postId;
        const post = await this.postService.getPostDetail(postId);

        if(post){
            res.status(200).json({
                post,
                message:"게시글 조회에 성공하였습니다."
            });
        }else{
            res.status(400).json({
                message:"게시글이 존재하지 않습니다."
            });
        };   
    };
    updatePost = async (req, res, next) => {
        
    };
    deletePost = async (req, res, next) => {
        
    };
}

module.exports=PostController;