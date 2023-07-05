const User = require('../database/models/user.js');

class UserRepository{
    create = async(payload)=>{
        const created = await User.create(payload).then(d=>{return d.toJSON()});
        return created;
    }
    findById = async(id)=>{
        const data = await User.findByPk(id).then(d=>{return d.toJSON()});
        return data;
    }
    findByNickname = async(nickname)=>{
        const data = await User.findOne({where:{nickname}}).then(d=>{return d});
        return data;
    }
    findAll = async()=>{
        const datas = await User.findAll({order:[['createdAt','Desc']]});
        return datas;
    }
    update = async (payload,id) => {
        const updated = await User.update(payload,{where:{id}}).then(d=>{return d});
        return updated;
    }
    delete = async (id) =>{
        const deleted = await User.destroy({where:id});
        return deleted;
    }
}

module.exports=UserRepository;