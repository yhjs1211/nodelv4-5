const Post = require('../database/models/post.js');
const User = require('../database/models/user.js');
const Like = require('../database/models/like.js');

class PostRepository{
    create = async(data)=>{

        const created = await Post.create(data);
        return created;
    }
    findById = async(id)=>{
        
        const data = await Post.findByPk(id,{
            include:{
                model:User,
                as:'LikeUser',
                attributes:['name','nickname']
            }
        });
        
        if(data){
            return data;
        }else{
            return false;
        }        
    }
    findAll = async(whereData)=>{
        let datas;
        if(whereData){
            datas = await Post.findAll({
                where:{userId:whereData},
                include:[
                    {
                        model:User,
                        attributes:['name','nickname','token']
                    },
                    {
                        model:User,
                        as:'LikeUser',
                        attributes:['name','nickname']
                    }
                ],
                order:[['createdAt','DESC']],
            });
        }else{
            datas = await Post.findAll({
                order:[['createdAt','DESC']],
                include:[
                    {
                        model:User,  // POST 작성자
                        attributes:['name','nickname']
                    },
                    {
                        model:User, // 좋아요 누른 유저
                        as:'LikeUser',
                        attributes:['name','nickname']
                    }
                ]
            });
        }
        return datas;
    }
    update = async (datas, payload, postId) => {
        const post = await Post.findByPk(postId);
        const userId = payload.userId;
        if(post.userId==userId){
            const updated = await post.update(datas);
            return { updated, isSuccessful : true };
        }else{
            return {
                message:"수정 권한이 없습니다.",
                isSuccessful : false
            };
        }
    }
    delete = async (payload, postId) =>{
        const post = await Post.findByPk(postId);
        const userId = payload.userId;
        if(post.userId==userId){
            await post.destroy();
            return { isSuccessful : true };
        }else{
            return {
                message:"삭제 권한이 없습니다.",
                isSuccessful : false
            };
        }
    }
    like = async (postId,userId) => {
        const post = await Post.findByPk(postId);
        try {
            if(await post.hasLikeUser(userId)){
                await post.removeLikeUser(userId);
                return { isSuccessful : true , message:"좋아요 취소!"};
            }else{
                await post.addLikeUser(userId);
                return { isSuccessful : true , message:"좋아요 추가!"};
            }
        } catch (e) {
            return { isSuccessful : false , message:"좋아요 실패!"};
        }
    }
    findAllByLike = async (userId) => {
        try {
            const data = await Like.findAll({
                where:{userId},
                include:{
                    model:Post,
                    include:{
                        model:User,
                        as:'LikeUser',
                        attributes:['name','nickname']
                    },
                    foreignKey:'id'
                },
            });    
            return {data , isSuccessful : true};
        } catch (e) {
            console.error(e);
            return {message:"조회에 실패하였습니다." , isSuccessful : false};
        }
        
    }
}

module.exports=PostRepository;