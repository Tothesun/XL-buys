/*
 * @Author: your name
 * @Date: 2020-10-12 15:12:56
 * @LastEditTime: 2020-12-06 19:15:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.devtools = true;

//1.引入全局样式
import "./style/common.less"

//2.挂载路由
import router from "./router/index"

//3.引入vant插件
import "./plugin/vant"

//4.引入rem对字体大小的处理
import "./config/rem"

//5.引入vuex
import store from "./store/index"

//6.引入全局过滤器
import "./config/filter"


new Vue({
    router,
    store,
  render: h => h(App)
}).$mount('#app')
