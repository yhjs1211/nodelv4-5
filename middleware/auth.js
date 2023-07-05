const jwt = require('jsonwebtoken');
const User = require('../database/models/user.js');
const config = require('../config.js');

const auth = {};
    
auth.getAccessToken = async (userId) => {
    const token = 'Bearer ' + jwt.sign({userId},config.jwt.secretAccess,{expiresIn:config.jwt.expiresInAccess});
    return token;
};
auth.getRefreshToken = async (userId) => {
        const token = 'Bearer ' + jwt.sign({userId},config.jwt.secretRefresh,{expiresIn:config.jwt.expiresInRefresh});
        return token;
};
auth.verify = async (req, res, next) => {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;

        if(accessToken){
            let token = accessToken.split(' ')[1];

            let payloadAccessToken = await jwt.verify(token,config.jwt.secretAccess,(err,decoded)=>{
                if(err){
                    return false;
                }else{
                    return decoded;
                }
            });

            if(payloadAccessToken){
                const userId = payloadAccessToken.userId;
                const user = await User.findByPk(userId);
                if(user){
                    res.locals.foundUser = user.dataValues;
                    next();
                }else{
                    res.status(404).json({
                        message:"회원이 존재하지 않습니다."
                    });
                }
            }else{
                token = refreshToken.split(' ')[1];

                let payloadRefreshToken = await jwt.verify(token,config.jwt.secretRefresh,(err,decoded)=>{
                    if(err){
                        return false;
                    }else{
                        return decoded;
                    }
                });
                if(payloadRefreshToken){
                    const userId = payloadRefreshToken.userId;
                    const user = await User.findByPk(userId);
                    if(user && user.dataValues.token==refreshToken){
                        const newAccessToken = await auth.getAccessToken(user.dataValues.id);
                        
                        res.cookie('accessToken',newAccessToken);
                        res.locals.foundUser = user;
                        next();
                    }else{
                        if(!user){
                            return res.status(404).json({
                                message:"회원이 존재하지 않습니다."
                            });
                        }
                        res.status(400).json({
                            message:"토큰을 확인해주세요."
                        });
                    }
                    
                }else{
                    res.status(400).json({
                        message:"토큰이 만료되었습니다."
                    });
                }
            }
        }else{
            res.status(400).json({
                errorMessage: "로그인이 필요한 기능입니다."
            });
        }
};

module.exports=auth;