/*
 * @Author: your name
 * @Date: 2021-02-02 13:31:35
 * @LastEditTime: 2021-03-03 10:31:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\routes\cart\order.js
 */
import express from "express";
import ORDER from "./../../modules/order";
const router = express.Router({});

/* 提交订单事件 */
router.post("/web/api/submitOrder", (req, res, next) => {
  let order = new ORDER({
    //用户
    phone: req.body.phone,
    //标题
    title: req.body.title, 
    //商品详情
    product: req.body.product,
   //总价格
   allPrice:req.body.allPrice,
   //优惠
   discounts:req.body.discounts,
   //最终价格
   lastPrice:req.body.lastPrice, 
    //最终文案
    lastText: req.body.lastText,
  });

  let result = order.save();
  result.then(data=>{
      if(data === order){
          let lastData = {
            orderId : data._id,
            phone: data.phone,
            lastPrice:data.lastPrice,
            product: JSON.parse(data.product)
          }
          res.json({
              status:200,
              message:"订单存储成功！",
              data:lastData
          })
      }else{
          res.json({
              status:1,
              message:"订单生成错误！"
          })
      }
  })
});


/* 请求订单数据事件 */
router.post("/web/api/requestOrderData",(req,res,next)=>{
  if(req.body.phone){
    ORDER.find({phone:req.body.phone},(err,data)=>{
      if(err){
        throw err;
      }
      res.json({
        status:200,
        result:data
      }) 
    })
  }
})

module.exports = router;
