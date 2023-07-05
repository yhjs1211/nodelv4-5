const Post = require('../database/models/post.js');

class PostRepository{
    create = async(payload)=>{
        const created = await Post.create(payload).then(d=>{return d.toJSON()});
        return created;
    }
    findById = async(id)=>{
        const data = await Post.findByPk(id).then(d=>{return d.toJSON()});
        return data;
    }
    findAll = async()=>{
        const datas = await Post.findAll();
        return datas;
    }
    findByNickname = async (nickname) => {
        const datas = await Post.findOne({where:{nickname}}).then(d=>{return d.toJSON()});
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