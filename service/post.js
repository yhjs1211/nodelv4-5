const PostRepository = require('../repositories/post.js');

class PostService{
    constructor(){
        this.repository = new PostRepository();
    }
    createPost = async (datas,user) =>{
        const {title, content} = datas;
        const { id, nickname } = user;

        const payload = { userId:id , nickname, title, content};
        return await this.repository.create(payload);
    }
    getPosts = async (where=undefined) => {
        return await this.repository.findAll(where);
    }
    getPostDetail = async (postId) => {
        return await this.repository.findById(postId);
    }
}

module.exports=PostService;