const jwt = require('jsonwebtoken');
const User = require('../database/models/user.js');
const config = require('../config.js');

class Auth{
    getAccessToken = async (userId) => {
        const token = 'Bearer ' + jwt.sign(
            {userId},
            config.jwt.secretAccess,
            {
                expiresIn:config.jwt.expiresInAccess
            }
        );
        return token;
    }
    getRefreshToken = async (userId) => {
        const token = 'Bearer ' + jwt.sign(
            {userId},
            config.jwt.secretRefresh,
            {
                expiresIn:config.jwt.expiresInRefresh
            }
        );
        return token;
    }
    verify = async (cookies) => {
        const accessToken = cookies.accessToken;
        const refreshToken = cookies.refreshToken;

        let token;
        if(accessToken){
            token = accessToken.split(' ')[1];
    
            let payloadAccess = await jwt.verify(token,config.jwt.secretAccess,(err,decoded)=>{
                    if(err){
                        return false;
                    }else{
                        return decoded;
                    }
                });

            if(payloadAccess){
                const userId = payloadAccess.userId;
                const foundUser = await User.findByPk(userId);
    
                if(foundUser){
                    return {
                        user : foundUser.dataValues,
                        isRefreshed : false,
                        isSuccessful : true
                    };
                }else{
                    return {
                        isRefreshed : false,
                        isSuccessful : false,
                        errorMessage : "존재하지 않는 회원입니다."
                    };
                }
            }else{
                let payloadRefresh;
                token = refreshToken.split(' ')[1];

                payloadRefresh = await jwt.verify(token,config.jwt.secretRefresh,(err,decoded)=>{
                    if(err){
                        return false;
                    }else{
                        return decoded;
                    }
                });

                const userId = payloadRefresh.userId;
                const foundUser = await User.findByPk(userId);
    
                if(foundUser.dataValues.token==refreshToken){
                    // 새로운 accessToken 발급
                    accessToken = this.getAccessToken(foundUser.dataValues.id);
    
                    return {
                        user : foundUser.dataValues,
                        isRefreshed : true,
                        isSuccessful : true,
                        accessToken
                    };
                }else{
                    return {
                        isSuccessful : false,
                        errorMessage : "다시 로그인해주세요."
                    };
                }
            }
        }else{
            return {
                isSuccessful : false,
                errorMessage : "로그인이 필요한 기능입니다."
            };
        }
    }
}

module.exports=Auth;