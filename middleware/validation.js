const validate = require('express-validator');
const {body,validationResult,cookie} = validate;
const jwt = require('jsonwebtoken');

let exprotValidates={};

const validator = async (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        next();
    }else{
        res.status(400).json({message:errors.array().map((v,idx)=>`${idx+1} : ${v.msg}`)});
    }   
};

exprotValidates.signUp = [
    body('name','이름을 입력해주세요.').trim().notEmpty(),
    body('nickname').trim()
    .matches(/^[\w]{3,}$/).withMessage('닉네임을 확인해주세요.'),
    body('password').trim()
    .custom((pw,{req})=>{
        if(pw.includes(req.body.nickname)){
            throw new Error('비밀번호 안에 닉네임을 포함할 수 없습니다.');
        }else{
            return pw;
        }
    })
    .custom((pw,{req})=>{
        if(pw!==req.body.confirm.trim()){
            throw new Error('비밀번호와 확인 비밀번호가 다릅니다.');
        }else{
            return pw;
        }
    })
    .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).withMessage('문자와 숫자,특수기호를 조합한 8~15자리를 입력해주세요.'),
    validator
];

exprotValidates.login = [
    body('nickname','닉네임을 입력해주세요.').trim().notEmpty(),
    body('password').trim()
    .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).withMessage('문자와 숫자,특수기호를 조합한 8~15자리를 입력해주세요.'),
    validator
];

exprotValidates.updateUser = [
    body('nickname','닉네임을 확인해주세요.').trim().isLength({min:1})
    .optional({nullable:true,checkFalsy:true}),
    body('password','패스워드를 확인해주세요.').trim()
    .matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).withMessage('문자와 숫자,특수기호를 조합한 8~15자리를 입력해주세요.')
    .optional({nullable:true,checkFalsy:true}),
    validator
];

exprotValidates.createPost = [
    body('title','제목을 입력해주세요.').trim().notEmpty(),
    body('content','내용을 입력해주세요.').trim().notEmpty(),
    validator
];

exprotValidates.updatePost = [
    body('title','수정할 제목을 입력해주세요.').trim().notEmpty(),
    body('content','수정할 내용을 입력해주세요.').trim().notEmpty(),
    validator
];
module.exports=exprotValidates;