const Post = require('../database/models/post.js');

let exportControllers={};

exportControllers.getPosts=async function(_, res){
    try {
        const datas = await Post.findAll({order:[['createdAt','DESC']]}).then(d=>{return d});

        res.status(200).json({
            data:datas
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success:false,
            "message":"Server Error"
        });
    }
};

exportControllers.getPost=async function(req, res){
    const postId = req.params._postId;

    try {
        const data = await Post.findByPk(postId);

        if(data){
            res.status(200).json(data.toJSON());
        }else{
            res.status(404).json({"message":"존재하지 않는 게시물 입니다."});
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
            "errorMessage": "게시글 조회에 실패하였습니다."
        })
    }
};

exportControllers.createPost=async function(req, res){
    const {id,nickname} = res.locals.user;
    const {title, content} = req.body;
    await Post.create({
        nickname,
        title,
        content,
        userId:id
    });

    res.status(201).json({
        message:"게시글 작성에 성공하였습니다."
    });
    res.end();
};

exportControllers.updatePost=async function(req, res){
    const postId = req.params._postId;
    const {id,nickname} = res.locals.user;
    const {title, content} = req.body;

    try {
        const data = await Post.findByPk(postId);
        
        if(!data){
            res.status(404).json({"message":"게시글이 존재하지 않습니다."});
        }else{
            if(data.dataValues.nickname===nickname && data.dataValues.userId===id){
                await Post.update({
                    title,
                    content
                },{
                    where: {
                        id:postId
                    }
                });

                res.status(200).json({
                    Success:true,
                    "message":"게시글을 수정하였습니다."
                });
            }else{
                res.status(412).json({
                    Success:false,
                    "message":"게시글 수정 권한이 없습니다."
                });    
            }
        }           
    } catch (e) {
        console.error(e);
        res.status(500).json({
            "errorMessage": "게시글 수정에 실패하였습니다."
        })
    }
};

exportControllers.deletePost=async function(req, res, next){
    const postId = req.params._postId;
    const {id,nickname} = res.locals.user;

    try {
        const data = await Post.findByPk(postId);
        if(!data){
            res.status(404).json({"message":"게시글이 존재하지 않습니다."});
        }else{
            if(data.dataValues.nickname===nickname && data.dataValues.userId===id){
                await Post.destroy({
                    where:{
                        id:postId
                    }
                });
                res.status(200).json({
                    Success:true,
                    "message":"게시글을 삭제하였습니다."
                });
            }else{
                res.status(403).json({
                    Success:false,
                    "message":"게시글 삭제 권한이 없습니다."
                });
            }
        }           
    } catch (e) {
        console.error(e);
        res.status(500).json({
            "errorMessage": "게시글 삭제에 실패하였습니다."
        })
    }
};

module.exports=exportControllers;