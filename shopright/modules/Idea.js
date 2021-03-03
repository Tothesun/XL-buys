/*
 * @Author: your name
 * @Date: 2021-01-29 17:18:47
 * @LastEditTime: 2021-01-29 17:24:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\modules\Idea.js
 */

 import mongoose from "mongoose"
 
 const ideaSchema = mongoose.Schema({
    //用户标识
    phone:{type:String,required:true},
    //建议内容
    content:{type:String,required:true},
 })

 const idea = mongoose.model("idea",ideaSchema);
 export default idea;