const User = require('../database/models/user.js');

const exportControllers={};

exportControllers.createUser=async function(req, res, next){
    const {name,nickname,password,confirm} = req.body;
    const nicknameReg = /^[\w]{3,}$/;
    const passwordReg = /^[\w!@#$%^*+=-]{4,}$/;
    // 1. 입력 유효값 확인
    if(nicknameReg.test(nickname) && passwordReg.test(password)){
        // 2. 패스워드 & 닉네임 중복값
        if(password.includes(nickname)){
            res.status(400).json({
                Success:false,
                "message":"패스워드와 닉네임이 중복되지 않게 설정해주세요."
            });
        }else{
            // 3. password === confirm ? pass : throw error    
            if(password===confirm){
                let reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/; // 문자,숫자,특수기호 조합으로 8-15
                if(reg.test(password)){
                    try {
                        const foundData = await User.findOne({where:{nickname}});
                        if(foundData==null){
                            const created = await User.create({
                                name,
                                nickname,
                                password
                            }).then(d=>{return d});
                            res.status(201).json(created.toJSON());
                            res.end();
                        }else{
                            res.status(412).json({
                                "errorMessage": "중복된 닉네임입니다."
                            });
                        }
                    } catch (e) {
                        console.log("Error => "+e);
                        res.status(400).json({
                            "errorMessage": "가입 실패했습니다."
                        });
                    }
                }else{
                    res.status(412).json({
                        "errorMessage":"문자와 숫자, 특수기호를 최소 1개씩 포함한 8~15자리 비밀번호를 입력해주세요."
                    });
                }
            }else{
                res.status(412).json({
                    "errorMessage":"비밀번호와 확인 비밀번호의 값이 다릅니다. 다시 시도해주세요."
                });
            }
        }
    }else{
        res.status(400).json({
            "errorMessage": "입력을 확인해주세요."
        });
    }
};

exportControllers.verifyUser=async function(req, res, next){
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
                "errorMessage": "닉네임 또는 패스워드를 확인해주세요."
            });
        }    
    } catch (error) {
        res.status(400).json({
            "errorMessage": "로그인에 실패하였습니다."
        });
        console.log(error);
    }
};

exportControllers.deleteCookieAuthorization=async function(req, res, next){
    res.clearCookie('Authorization');
    res.redirect('/');
};
module.exports=exportControllers;