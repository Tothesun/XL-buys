/*
 * @Author: your name
 * @Date: 2020-10-12 15:12:56
 * @LastEditTime: 2021-01-29 16:58:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \06-vue基础+项目实战\shopleft\src\router\index.js
 */

import Vue from "vue"
import router from "vue-router"

Vue.use(router);

//1.引入一级组件
import DashBoard from "./../views/dashboard/DashBoard"
import Login from "./../views/login/Login"

//2.引入二级组件
const Home = ()=>import("./../views/home/Home.vue")
const Category = ()=>import("./../views/category/Category.vue")
const Cart = ()=>import("./../views/cart/Cart.vue")
const Mine = ()=>import("./../views/mine/Mine.vue")

//3.引入三级组件
const ConfirmOrder = ()=>import("./../views/cart/children/ConfrimOrder.vue")
const LoginOut = ()=>import("./../views/mine/children/LoginOut/LoginOut.vue")
const AllOrder = ()=>import("./../views/mine/children/AllOrder/AllOrder.vue")
const MyAddress = ()=>import("./../views/mine/children/MyAddress/MyAddress.vue")
const Idea = ()=>import("./../views/mine/children/Idea/idea.vue")

//4.引入四级组件
const AddAddress  = ()=>import("./../views/mine/children/MyAddress/children/addAddress.vue")
const EditAddress  = ()=>import("./../views/mine/children/MyAddress/children/editAddress.vue")


export default new router({
    routes: [
        { path: "/", redirect: "/dashboard" },
        {
            path: "/dashboard",
            redirect:"/dashboard/home",
            name: "dashboard",
            component: DashBoard,
            children: [
                {path:"home",name:"home",component:Home},
                {path:"category",name:"category",component:Category},
                {
                    path:"cart",
                    name:"cart",
                    component:Cart,
                    children:[
                        {
                            path: "confirmorder",
                            name:"confirmorder",
                            component: ConfirmOrder
                        }
                    ]
                },
                { 
                    path:"mine",
                    name:"mine",
                    component:Mine,
                    children:[
                        {
                            path:"loginout",
                            name:"loginout",
                            component:LoginOut
                        },
                        {
                            path:"allorder",
                            name:"allorder",
                            component: AllOrder
                        },   
                        {
                            path:"idea",
                            name:"idea",
                            component: Idea
                        },  
                    ]
                },
                {
                    path:"myaddress",
                    name:"myaddress",
                    component: MyAddress,
                    children:[
                        {
                            path:"addaddress",
                            name:"addaddress",
                            component:AddAddress
                        },
                        {
                            path:"editaddress",
                            name:"editaddress",
                            component:EditAddress
                        }
                    ]
                }
            ]
        },
        {
            path:"/login",
            name:"login",
            component:Login
        }
    ],
})