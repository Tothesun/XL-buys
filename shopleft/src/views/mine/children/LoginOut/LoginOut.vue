<!--
 * @Author: your name
 * @Date: 2020-12-06 08:39:27
 * @LastEditTime: 2021-01-21 12:19:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\views\mine\children\LoginOut\LoginOut.vue
-->

<template>
  <div id="loginOut">
        <!-- 头部区域 -->
		<van-nav-bar id="header" :border="false" title="个人中心"  left-arrow @click-left="$router.go(-1)"/>

        <!-- 退出登录 -->
        <div id="backLogin" @click="loginOut" >退出登录</div>
  </div>
</template>

<script>
import {getItem,removeItem} from "./../../../../config/global"

import {mapMutations} from "vuex"

export default {

    methods:{
        ...mapMutations(["ADD_USERINFO","CLEAR_SHOPCAT"]),

        //退出登录
        loginOut(){
            
            //清除本地数据缓存
            removeItem("userInfo");

            //vuex数据同步
            this.ADD_USERINFO({
                userInfo:getItem("userInfo")
            })
            this.CLEAR_SHOPCAT();

            //路径返回
            this.$router.go(-1);
        }
    }
}
</script>

<style>
    #loginOut{
        width:100%;
        height:100%;
        background-color:#f5f5f5;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000;
    }
    #backLogin{
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        margin-top: 1rem;
        background-color:white;
        text-align: center;
        font-size: 0.95rem;
    }

</style>