/*
 * @Author: your name
 * @Date: 2020-12-14 14:55:27
 * @LastEditTime: 2021-01-29 16:15:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\modules\allGoods.js
 */
import mongoose from "mongoose"

const goodsSchema =  mongoose.Schema({
    //用户
    userInfo:{type:String,required:true},
    //商品编号
    id:{type:String,required:true},
    //商品缩略图
    image:{type:String,required:true},
    //商品名称
    name:{type:String,required:true},
    //商品数量
    num:{type:Number,required:true},
    //商品价格
    price:{type:String,required:true},
    //是否选中
    checked:{type:Boolean,required:true},
    //订单是否提交
    isSubmited:{type:Boolean,required:false},
    //订单是否支付
    isPaid:{type:Boolean,required:false},
    //订单是否签收
    isAccepted:{type:Boolean,required:false},
});

const goods = mongoose.model("goods",goodsSchema);
export default goods;