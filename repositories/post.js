const Post = require('../database/models/post.js');

class PostRepository{
    create = async(payload)=>{
        const created = await Post.create(payload).then(d=>{return d.toJSON()});
        return created;
    }
    findById = async(id)=>{
        const data = await Post.findByPk(id);
        if(data){
            return data.dataValues;
        }else{
            return false;
        }
        
    }
    findAll = async(where)=>{
        let datas;
        if(where){
            datas = await Post.findAll({where:{userId:where},order:[['createdAt','DESC']]});
        }else{
            datas = await Post.findAll({order:[['createdAt','DESC']]});
        }
        
        return datas;
    }
    update = async (payload,id) => {
        const updated = await Post.update(payload,{where:{id}}).then(d=>{return d});
        return updated;
    }
    delete = async (id) =>{
        const deleted = await Post.destroy({where:id});
        return deleted;
    }
}

module.exports=PostRepository;