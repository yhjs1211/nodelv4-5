const express = require('express');
const router = express.Router();

// DB Schema 연결
const Post = require('../models/post.js');
const User = require('../models/user.js');

// Auth Middleware
const isAuth = require('../middleware/auth.js');


router.route('/')
// 전체 목록 조회
.get(async (req,res)=>{
    let datas=null; 
    try {
        datas = await Post.findAll({order:[['createdAt','DESC']]}).then(d=>{return d});
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success:false,
            "message":"Server Error"
        });
    }
    res.json({
        data:datas
    });
})
// 게시글 작성
.post(isAuth,async (req, res, next) => {
    const {id,nickname} = res.locals.user;
    const {title, content} = req.body;
    if(title.length!=0 && content.length!=0){
        
        await Post.create({
            nickname,
            title,
            content,
            userId:id
        }).then(d=>{return d});

        res.status(201).json({
            message:"게시글 작성에 성공하였습니다."
        });
        res.end();
    }else{
        res.status(412).json({
            success:false,
            errorMessage:"제목과 내용을 확인해주세요."
        });
    }
});


router.route('/:_postId')
// 단일 게시글 조회
.get(async (req,res)=>{
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
})
// 게시글 수정
.put(isAuth,async (req,res)=>{
    const postId = req.params._postId;
    const {id,nickname} = res.locals.user;
    const {title, content} = req.body;

    try {
        const data = await Post.findByPk(postId);
        
        if(!data){
            res.status(404).json({"message":"게시글이 존재하지 않습니다."});
        }else{
            if(data.dataValues.nickname===nickname && data.dataValues.userId===id){
                if(title.length!=0 && content.length!=0){
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
                        "message":"데이터 형식이 올바르지 않습니다."
                    });    
                }
            }else{
                res.status(403).json({
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
})
// 게시글 삭제
.delete(isAuth,async (req,res)=>{
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
});

module.exports = router;