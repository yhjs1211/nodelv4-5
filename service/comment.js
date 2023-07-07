const CommentRepository = require('../repositories/comment.js');

class CommentService{
    constructor(){
        this.repository = new CommentRepository();
    }
    getComments = async (postId) => {
        return await this.repository.findAll(postId);
    };
    createComment = async (payload,postId,input) => {
        const comment = input.comment;
        const datas = {
            nickname:payload.nickname,
            userId:payload.userId,
            comment:input.comment,
            postId
        };
        return await this.repository.create(datas);
    };
    updateComment = async (payload,commentId,input) => {
        const newComment = input.comment;
        const userId = payload.userId;

        return await this.repository.update(newComment,commentId,userId);
    };
    deleteComment = async (payload,commentId) => {
        const userId = payload.userId;
        return await this.repository.delete(commentId,userId);
    };
};

module.exports=CommentService;