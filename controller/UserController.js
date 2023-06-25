const User = require('../database/models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

const exportControllers={};

exportControllers.createUser=async function(req, res){
    const {name,nickname,password} = req.body;
        try {
            const foundData = await User.findOne({where:{nickname}});
            if(foundData==null){
                const created = await User.create({
                    name,
                    nickname,
                    password
                }).then(d=>{return d});
                return res.status(201).json(created.toJSON());
            }else{
                return res.status(412).json({
                    "errorMessage": "중복된 닉네임입니다."
                });
            }
        } catch (e) {
            console.log("Error => "+e);
            return res.status(400).json({
                "errorMessage": "가입 실패했습니다."
            });
        }
};

exportControllers.verifyUser=async function(req, res){
    const {nickname, password} = req.body;
    try {
        const data = await User.findOne({where:{nickname,password}});

        if(data!=null){
            // Token
            const token = await jwt.sign({
                id:data.dataValues.id}
                , config.jwt.secret 
                ,{expiresIn:config.jwt.expiresInDay}
            );
            res.cookie('Authorization','Bearer '+token,{httpOnly:true});
            
            res.status(200).json({
                Success:true,
                "message":"로그인 되었습니다."
            });
        }else{
            res.status(412).json({
                "errorMessage": "닉네임 또는 패스워드가 일치하지 않습니다."
            });
        }    
    } catch (error) {
        res.status(400).json({
            "errorMessage": "로그인에 실패하였습니다."
        });
        console.log(error);
    }
};

exportControllers.deleteCookieAuthorization=async function(_,res){
    res.clearCookie('Authorization');
    res.redirect('/');
};
module.exports=exportControllers;