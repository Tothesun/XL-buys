/*
 * @Author: your name
 * @Date: 2021-01-30 12:25:30
 * @LastEditTime: 2021-02-02 11:45:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\routes\mine\mine.js
 */
import express from "express";
import IDEA from "./../../modules/Idea";
import CUPON from "./../../modules/cupon";
const router = express.Router({});

/* 用户建议 */
router.post("/web/api/mine/idea", (req, res, next) => {
  let idea = new IDEA({
    //用户标识
    phone: req.body.phone,
    //建议内容
    content: req.body.content,
  });

  //2.存入数据库
  let result = idea.save();
  result.then((data) => {
    if (data === idea) {
      res.json({
        status: 200,
        message: "数据存入成功！",
      });
    } else {
      res.json({
        status: 1,
        message: "数据存入失败！",
      });
    }
  });
});

/* 添加一个优惠券 */
router.post("/web/api/mine/addCupon", (req, res, next) => {
  //要设定一个优惠券可以兑换的条件
  let flag = true;
  if (flag) {
    let cupon = new CUPON({
      //用户标识
      phone: req.body.phone,
      //兑换码
      code: req.body.code,
      //名称
      name: "过年优惠券",
      //折扣券优惠金额，单位分
      value: 500,
      //满减条件
      condition: "至少20元可用",
      //卡有效开始时间 (时间戳, 单位秒)
      startAt: Date.parse(new Date())/1000,
      //卡失效日期 (时间戳, 单位秒)
      endAt: Date.parse(new Date())/1000 + 360000,
      //是否可用
      isAvailable: true,
      //描述信息，优惠券可用时展示
      description: "该优惠券只能该用户使用，不能转给他人",
      //不可用原因，优惠券不可用时展示
      reason: "超过使用期限，该券不能使用",
    });

    let result = cupon.save();
    result.then((data) => {
      if (data === cupon) {
        res.json({
          status: 200,
          result: "优惠券添加成功！",
        });
      } else {
        res.json({
          status: 1,
          result: "优惠券添加失败，服务器内部错误",
        });
      }
    });
  }
});

/* 请求所有的优惠券 */
router.post("/web/api/mine/getAllCupon",(req,res,next)=>{
    CUPON.find({phone:req.body.phone},(err,data)=>{
        if(err){
            throw err;
        }
        res.json({
            status: 200,
            result: data
        })
    })
})

module.exports = router;
