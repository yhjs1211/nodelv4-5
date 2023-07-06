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
    update = async (datas,id) => {
        const updated = await Post.update(datas,{where:{id}});
        return updated;
    }
    delete = async (id) =>{
        const deleted = await Post.destroy({where:id});
        return deleted;
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