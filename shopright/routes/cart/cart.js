/*
 * @Author: your name
 * @Date: 2021-01-17 14:45:44
 * @LastEditTime: 2021-01-29 16:15:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\routes\cart\cart.js
 */

 import express from "express"
 const router = express.Router();
 
 //引入商品数据库
 import GOODS  from "./../../modules/goods"

 /* 商品添加到购物车 */
router.post("/web/api/addToCart",(req,res,next)=>{
    if(req.body.id || req.body.userInfo){
        GOODS.findOne({userInfo:req.body.userInfo, id:req.body.id},(err,product)=>{
            if(err){
                throw err;
            }
            if(product === null){  //商品不存在，要产生新的数据
                let goods = new GOODS({
                    //用户 
                    userInfo: req.body.userInfo,
                    //商品编号
                    id: req.body.id,
                    //商品缩略图  
                    image: req.body.image,
                    //商品名称
                    name: req.body.name,
                    //商品数量
                    num: req.body.num,
                    //商品价格
                    price: req.body.price,
                    //是否选中
                    checked: req.body.checked, 
                    //订单是否提交
                    isSubmited: false,
                    //订单是否支付
                    isPaid: false,
                    //订单是否签收
                    isAccepted:false,
                })
                goods.save((err,result)=>{
                    if(err){
                        throw err;
                    }  
                })
            }else{  //商品有重复的，直接num+1就好！
                product.num  = product.num + 1;
                product.save();
            }
            res.json({
                status: 200,
                result: "商品成功加入购物车！"
            })
        })
    } else{   //用户的信息或者商品的id没有传过来
        res.json({
            status:1,
            result: "非法添加商品！"
        })
    }
})

 /* 单个商品的选中和取消选中 */     
 router.post("/web/api/goods/singleChoose", (req,res,next)=>{
    GOODS.findOne({userInfo:req.body.userInfo, id:req.body.id}, (err,data)=>{
        data.checked = req.body.checked;
        let newProduct  =  data.save();
        newProduct.then(result=>{
            if(result === data){
                res.json({
                    status:200,
                    result:"成功修改是否选中商品！"
                })
            } 
        })
              
    })
 })

  /* 单个商品的增加和减少 */
router.post("/web/api/goods/singleAddOrReduce" , (req,res,next)=>{
    
    GOODS.findOne({userInfo:req.body.userInfo, id:req.body.id}, (err,data)=>{
        //判断是增加还是减少 
        if(Number(req.body.flag) === 1){ //商品增加
            data.num = Number(data.num) + 1;
        }else if(Number(req.body.flag) === 0){ // 商品减少
            if(Number(data.num) === 1){
                //删除
                data.remove();
            }else{
                data.num -= 1;
            }
                
        }else{
            res.json({
                status:1,
                message:"不知您是想要增加还是减少，1为增加，2为减少哦！"
            })
        }
        let newData = data.save();
        newData.then(result=>{
            if(result === data){
                res.json({                       
                    status:200,
                    result:"成功修改商品数量！"
                })
            } 
        })       
    })
  })

  /* 清空购物车 */
router.post("/web/api/goods/clearCart",(req,res,next)=>{
    GOODS.find({userInfo: req.body.userInfo},(err,products)=>{
        if(err){
            throw err;
        }
        if(products.length > 0){
            for(let i = 0; i < products.length; i++){
                products[i].remove();
            }
            res.json({ 
                status:200,
                message:"成功清除购物车！"
            })
        }
    })
})

 module.exports = router;