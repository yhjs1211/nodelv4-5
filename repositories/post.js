const Post = require('../database/models/post.js');
const User = require('../database/models/user.js');

class PostRepository{
    create = async(data)=>{

        const created = await Post.create(data);
        return created;
    }
    findById = async(id)=>{
        
        const data = await Post.findByPk(id,{attributes:['id','nickname','title','content','like','createdAt', 'updatedAt','userId']});

        if(data){
            return data;
        }else{
            return false;
        }
        
    }
    findAll = async(where)=>{
        let datas;
        if(where){
            datas = await Post.findAll({
                where:{userId:where},
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
                        attributes:['name','nickname','token']
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
}

module.exports=PostRepository;