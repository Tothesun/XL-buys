/*
 * @Author: your name
 * @Date: 2020-11-19 19:36:40
 * @LastEditTime: 2021-01-16 21:18:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\routes\login\login.js
 */
import express from "express"
import User from "../../modules/user"
const router = express.Router({});

//引入全局配置
import global from "./../../config/global"


/*  获取短信验证码 */
router.get('/web/api/send_code', (req, res, next)=>{
    
    let randCode = randomCode(6);
    global.userCode = randCode;
    global.userPhone = req.query.phone;
    res.json({
        "success":true,  
        "data":{
            "phone": req.query.phone,  
            "code": randCode
        } 
    })
});

/* 生成指定长度的随机数 */
function randomCode(length) {
    let chars = ['0','1','2','3','4','5','6','7','8','9'];
    let result = "";
    for(let i = 0; i < length ; i ++) {
        let index = Math.ceil(Math.random()*9);
        result += chars[index];
    }
    return result;
}

/* 登录 */
router.post('/web/api/login_code', (req, res)=>{

    // 1. 获取数据
    const getPhone = req.body.phone;
    const getCode = req.body.code;

    // 2. 判断验证码是否正确
    if(getPhone === undefined || getCode === undefined  || getPhone !== global.userPhone || getCode !== global.userCode){
        return res.json({error_code: 0, message: '手机或验证码不正确!'})
    }else{

        //2.1 用户数据创建
        const user = new User({
            //手机号码
            phone: getPhone,
        });
        User.find({phone:getPhone},(err,data)=>{
            if(data.length === 0){
                user.save((err,result)=>{
                    if(err){
                        throw err;
                    } 
                })
            }
            res.json({
                status:200,
                result:{
                    phone: getPhone,
                    message:"登录成功！"
                }
                
            })
        })
        
    }
});

module.exports = router;