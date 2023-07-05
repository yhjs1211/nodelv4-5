const UserRepository = require('../repositories/user.js');
const auth = require('../middleware/auth.js');

class UserService{
    constructor(){
        this.repository = new UserRepository();
    }
    verifyUser = async (payload) => {
        const { nickname, password } = payload;

        const user = await this.repository.findByNickname(nickname);

        if(user && user.password == password){
            const accessToken = await auth.getAccessToken(user.id);
            const refreshToken = await auth.getRefreshToken(user.id);

            await user.update({token:refreshToken});

            return { accessToken, refreshToken, result : true };
        }else{
            return { result : false };
        }
    }
    findAllUser = async (req, res, next) => {
        const datas = await this.repository.findAll();
        return datas;
    }
    findUserById = async (req, res, next) => {
        const id = res.locals.user.id;

        const data = await this.repository.findById(id);
        res.status(200).json({
            data:data
        });
    }
    createUser= async (datas) => {
        const { nickname, name, password } = datas;
        const payload = {
            nickname,
            name,
            password
        };
        const user = await this.repository.findByNickname(nickname);
        if(!user){
            const created = await this.repository.create(payload).then(d=>{return d});
            return {created, result:true};
        }else{
            return {result:false};
        }
    }
    updateUser = async (datas,user) => {
        const { nickname,password } = datas;

        let payload;
        if(!nickname && !password){
            res.status(400).json({
                message:"업데이트 할 내용을 적어주세요."
            });
        }else if(!nickname && password){
            payload = {password};
        }else if(nickname && !password){
            payload = {nickname};
        }else{
            payload = {
                nickname,
                password
            };
        };

        return await this.repository.update(payload,user.id);
    }
    deleteUser = async (req, res, next) => {
        const id = res.locals.user.id;
        
        const deleted = await this.repository.delete(id);

        if(deleted){
            res.status(200).json({
                message:"탈퇴 되었습니다."
            })
        }else{
            res.status(400).json({
                message:"존재하지 않는 회원입니다."
            })
        }
    }
}

module.exports=UserService;