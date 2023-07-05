const Comment = require('../database/models/comment.js');

class CommentRepository{
    create = async(payload)=>{
        const created = await Comment.create(payload).then(d=>{return d.toJSON()});
        return created;
    }
    findById = async(id)=>{
        const data = await Comment.findByPk(id).then(d=>{return d.toJSON()});
        return data;
    }
    findAll = async()=>{
        const datas = await Comment.findAll();
        return datas;
    }
    findByNickname = async (nickname) => {
        const datas = await Comment.findOne({where:{nickname}}).then(d=>{return d.toJSON()});
        return datas;
    }
    update = async (payload,id) => {
        const updated = await Comment.update(payload,{where:{id}}).then(d=>{return d});
        return updated;
    }
    delete = async (id) =>{
        const deleted = await Comment.destroy({where:id});
        return deleted;
    }
}