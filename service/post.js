const PostRepository = require('../repositories/post.js');

class PostService{
    constructor(){
        this.repository = new PostRepository();
    }
    createPost = async (datas,payload) =>{
        const {title, content} = datas;
        const { userId, nickname } = payload;

        const data = { userId , nickname, title, content};
        return await this.repository.create(data);
    }
    getPosts = async (where=undefined) => {
        return await this.repository.findAll(where);
    }
    getPostDetail = async (postId) => {
        return await this.repository.findById(postId);
    }
    updatePost = async (datas,postId) =>{
        return await this.repository.update(datas,postId);
    }
    likePost = async (postId,payload) => {
        const userId = payload.userId;
        return await this.repository.like(postId,userId);
    }
}

module.exports=PostService;