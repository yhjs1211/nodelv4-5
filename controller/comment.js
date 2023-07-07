const CommentService = require('../service/comment.js');

class CommentController{
    constructor(){
        this.commentService = new CommentService();
    }
    getComments = async (req, res, next) => {
        const postId = req.query.id;

        try {
            const comments = await this.commentService.getComments(postId);
            res.status(200).json({
                message:"댓글 조회 성공!",
                comments
            });
        } catch (e) {
            console.error(e);
            res.status(400).json({
                message:"댓글 조회 실패 !"
            });
        }
    }
    createComment = async (req, res, next) => {
        const payload = res.locals.payload;
        const postId = req.query.id;
        
        const created = await this.commentService.createComment(payload,postId,req.body);
        
        if(created.isSuccessful){
            res.status(200).json({
                created:created.created.dataValues,
                message:"댓글이 생성되었습니다."
            });
        }else{
            res.status(400).json({
                message:created.message
            });
        }
    }
    updateComment = async (req, res, next) => {
        const payload = res.locals.payload;
        const commentId = req.query.id;
        console.log(commentId);
        const updated = await this.commentService.updateComment(payload,commentId,req.body);
        
        if(updated.isSuccessful){
            res.status(200).json({
                message:updated.message
            });
        }else{
            res.status(400).json({
                message:updated.message
            });
        }
    }
    deleteComment = async (req, res, next) => {
        const commentId = req.query.id;
        const payload = res.locals.payload;
        const deleted = await this.commentService.deleteComment(payload,commentId);

        if(deleted.isSuccessful){
            res.status(200).json({
                message:deleted.message
            });
        }else{
            res.status(400).json({
                message:deleted.message
            });
        }
    }
}

module.exports=CommentController;