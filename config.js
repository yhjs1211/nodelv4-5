const dotenv = require('dotenv');
dotenv.config();

function configValue(key, defalutValue=undefined){

    const value = process.env[key] || defalutValue;
    if(!value){
        throw new Error(`${key} as key is undefined`);
    }else{
        return value;
    }
};

const config ={
    jwt:{
        secret:configValue('JWT_SECRET','gMhHLk&9dzpv$4#rP!3NdAr00gTq3$SS'),
        expiresInDay:configValue('JWT_EXPIRE_DAY','1d')
    },
    host:{
        port: parseInt(configValue('HOST_PORT',8081)),
    },
    db:{
        host:configValue('HOST','express-database.cjx2t84z9jyl.ap-northeast-2.rds.amazonaws.com'),
        username:configValue('USERNAME','root'),
        database:configValue('DATABASE','node_db'),
        password:configValue('PASSWORD','20211211')
    }
};

module.exports=config;