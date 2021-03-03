/*
 * @Author: your name
 * @Date: 2021-01-29 21:39:10
 * @LastEditTime: 2021-01-30 12:49:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\modules\cupon.js
 */
import mongoose from "mongoose"

const cuponSchema = mongoose.Schema({
    //用户标识
    phone:{type:String,required:true},
    //兑换码
    code:{type:String,required:true},
    //名称
    name:{type:String,required:false},
    //折扣券优惠金额，单位分
    value:{type:Number,required:false},
    //满减条件
    condition:{type:String,required:false},
    //卡有效开始时间 (时间戳, 单位秒)
    startAt:{type:String,required:false},
    //卡失效日期 (时间戳, 单位秒)
    endAt:{type:String,required:false},
    //是否可用
    isAvailable:{type:Boolean,required:false},
    //描述信息，优惠券可用时展示
    description:{type:String,required:false},
    //不可用原因，优惠券不可用时展示
    reason:{type:String,required:false},
    //折扣券优惠金额文案
    valueDesc:{type:String,required:false},
    //单位文案
    unitDesc:{type:String,required:false},
    
})

const cupons = mongoose.model("cupons",cuponSchema);
export default cupons;