/*
 * @Author: your name
 * @Date: 2021-01-21 15:47:05
 * @LastEditTime: 2021-01-28 21:18:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\modules\address.js
 */

 import mongoose from "mongoose"

 const addressSchema = mongoose.Schema({
     //用户
     phone:{type:String, required:true},
     //地址姓名
     addressName:{type:String, required:true},
     //地址电话
     tel:{type:String, required:true},
     //省
     province:{type:String, required:true},
     //市
     city:{type:String, required:true},
     //区
     county:{type:String, required:true},
     //地区码
     areaCode:{type:String, required:true},
     //详细地址
     addressDetail:{type:String, required:true},
     //邮政编码
     postalCode:{type:String, required:true},
     //是否默认
     isDefault:{type:Boolean},
 })

 const address = mongoose.model("address",addressSchema);
 export default address;
