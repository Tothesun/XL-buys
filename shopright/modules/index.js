/*
 * @Author: your name
 * @Date: 2020-12-06 21:13:18
 * @LastEditTime: 2021-01-16 15:02:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\modules\index.js
 */
import mongoose from "mongoose"

//监听mongodb的连接
mongoose.connect("mongodb://localhost/test",{ 
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

//监听连接失败：
mongoose.connection.on("err",()=>{
    console.log("数据库连接失败！");
});
//监听连接成功： 
mongoose.connection.on("open",()=>{
   console.log("数据库连接成功！");
});
    


