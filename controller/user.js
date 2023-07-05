const UserService = require('../service/user.js');

// 실 서비스 로직에 대한 노출이 없을것 !
class UserController{
    constructor(){
        this.userService = new UserService(); // 의존성 주입(Dependency Injection)
    }
    signup = async (req, res, next) => {
        const data = await this.userService.createUser(req.body);
        if(data.result){
            res.status(201).json(data.created);
        }else{
            res.status(400).json({
                message:"이미 존재하는 닉네임 입니다."
            });
        }
    }
    login = async (req, res, next) => {
        const data = await this.userService.verifyUser(req.body);
        if(data.result){
            res.cookie('accessToken',data.accessToken);
            res.cookie('refreshToken',data.refreshToken);

            res.status(200).json({
                accessToken:data.accessToken,
                refreshToken:data.refreshToken,
                message:"로그인 되었습니다."
            });
        }else{
            res.status(400).json({
                message:"아이디와 비밀번호를 확인해주세요."
            });
        }
    }
    logout (req, res, next){
        res.clearCookie('Authorization');
        res.redirect('/');
    }
    update = async (req, res, next) =>{

        const cookies ={
            accessToken:req.cookies.accessToken,
            refreshToken:req.cookies.refreshToken
        }

        const message = await this.userService.updateUser(req.body,cookies);

        if(message.result){
            if(message.accessToken){
                res.cookie('accessToken',message.accessToken);
                
                return res.status(200).json({
                    message:"업데이트 성공!",
                    accessToken:message.accessToken
                });
            }
            res.status(200).json({
                message:"업데이트 성공!"
            });
        }else{
            res.status(400).json({
                message:message.errorMessage
            });
        }
    }
    getAllUser = async (req, res, next) => { // 관리자만 접근 가능 , 유효성 검증 필수
        const datas = await this.userService.findAllUser();
        res.status(200).json({
            data:datas
        });
    }
}

module.exports=UserController;