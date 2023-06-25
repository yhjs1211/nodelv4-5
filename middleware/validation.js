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

exprotValidates.validateSignUp = [
    body('name').trim().isLength({min:1}).withMessage("이름이 비었어요!"),
    body('nickname').trim().matches(/^[\w]{3,}$/).withMessage('닉네임을 확인해주세요.'),
    body('password').trim().custom((pw,m)=>{
        if(pw.includes(m.req.body.nickname)){
            return false;
        }else{
            return true;
        }
    }).withMessage('비밀번호 안에 닉네임을 포함할 수 없습니다.').equals(body('confirm')).withMessage('비밀번호와 확인 비밀번호가 다릅니다.').matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).withMessage('문자와 숫자,특수기호를 조합한 8~15자리를 입력해주세요.'),
    validator
];

exprotValidates.validateLogin = [
    body('nickname').trim().isLength({min:1}).withMessage("올바른 닉네임을 입력해주세요."),
    body('password').trim().matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/).withMessage('문자와 숫자,특수기호를 조합한 8~15자리를 입력해주세요.'),
    validator
];

exprotValidates.validateCreatePost = [
    body('title').trim().isLength({min:1}).withMessage("제목을 입력해주세요."),
    body('content').trim().isLength({min:1}).withMessage("내용을 입력해주세요."),
    validator
];

exprotValidates.validateUpdatePost = [
    body('title').trim().isLength({min:1}).withMessage("수정할 제목을 입력해주세요."),
    body('content').trim().isLength({min:1}).withMessage("수정할 내용을 입력해주세요."),
    validator
];
module.exports=exprotValidates;