/*
 * @Author: your name
 * @Date: 2021-02-02 13:25:40
 * @LastEditTime: 2021-02-04 10:57:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\modules\order.js
 */

 import mongoose from "mongoose"

 const orderSchema = mongoose.Schema({
     //用户
     phone:{type:String,required:true},
     //标题
     title:{type:String,required:true},
     //商品详情
     product:{type:String,required:true},
     //总价格
     allPrice:{type:Number,required:true},
     //优惠
     discounts:{type:Number,required:true},
     //最终价格
     lastPrice:{type:Number,required:true},
     //最终文案
     lastText: {type:String,required:true}

 })

 const order = mongoose.model("order",orderSchema);
 export default order;