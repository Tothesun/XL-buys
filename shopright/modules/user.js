/*
 * @Author: your name
 * @Date: 2020-12-06 21:22:05
 * @LastEditTime: 2021-01-16 15:05:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\modules\userSchema.js
 */
import mongoose from "mongoose"

const userSchema =  mongoose.Schema({
    //手机号
    phone:{type:String,required:true},
});


const Users = mongoose.model("users",userSchema);
export default Users;
