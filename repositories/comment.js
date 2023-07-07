const Comment = require('../database/models/comment.js');

class CommentRepository{
    create = async(datas)=>{
        try {
            const created = await Comment.create(datas);    
            return { created , isSuccessful : true };
        } catch (e) {
            console.error(e);
            return { message:"댓글 생성에 실패하였습니다.", isSuccessful : false };
        }
        
        
    }
    findAll = async(postId)=>{
        const datas = await Comment.findAll({where:{postId}});
        return datas;
    }
    update = async (newComment,commentId,userId) => {
        const comment = await Comment.findByPk(commentId);
        
        if(comment.userId==userId){
            const updated = await comment.update({comment:newComment});
            if(updated){
                return { isSuccessful : true , message: " 업데이트에 성공하였습니다. "};
            }else{
                return { isSuccessful : false , message: " 업데이트에 실패하였습니다. "};
            }
        }else{
            return { isSuccessful : false , message: " 댓글 수정 권한이 없습니다. "};
        }
    }
    delete = async (commentId,userId) =>{
        const comment = await Comment.findByPk(commentId);
        if(comment.userId==userId){
            await comment.destroy().then(()=>console.log('deleted!'));
            return { isSuccessful : true , message: " 댓글이 삭제되었습니다. "};
        }else{
            return { isSuccessful : false , message: " 댓글 삭제 권한이 없습니다. "};
        }
        return deleted;
    }
}

module.exports=CommentRepository;