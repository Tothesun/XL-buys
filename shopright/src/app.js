/*
 * @Author: your name
 * @Date: 2020-10-12 15:06:58
 * @LastEditTime: 2021-02-04 11:23:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \06-vue基础+项目实战\shopright\app.js
 */
import express from "express"
import bodyParser from "body-parser"
//引入数据库的连接
import "./../modules/index"
const app = express();

//定义允许跨域的中间件
let allowCrossOrigin = function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	next();
}
app.use(allowCrossOrigin);

//引入数据处理的中间件
app.use(bodyParser.urlencoded({extended: false}));

//引入home的api
import homeRouter from "./../routes/home/home"
app.use(homeRouter);

//引入category的api
import categoryApi from "./../routes/category/category"
app.use(categoryApi);

//引入登录的api
import loginApi from "./../routes/login/login"
app.use(loginApi);


//引入请求用户数据的api
import indexApi from "./../routes/index"
app.use(indexApi);

//引入商品处理的api
import dealGoodsApi from "./../routes/cart/cart"
app.use(dealGoodsApi);

//引入地址的api
import addressApi from "./../routes/address/address"
app.use(addressApi);

//引入我的界面处理api
import mineApi from "./../routes/mine/mine"
app.use(mineApi);

//引入订单api
import orderApi from "./../routes/cart/order"
app.use(orderApi);

app.listen(3000, () => {
	console.log("service is running!");
});
