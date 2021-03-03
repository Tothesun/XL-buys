/*
 * @Author: your name
 * @Date: 2020-10-12 15:12:56
 * @LastEditTime: 2020-10-13 17:33:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \06-vue基础+项目实战\shopleft\src\store\index.js
 */

 import Vue from "vue"
 import Vuex from "vuex"

 Vue.use(Vuex);

 import mutations from "./mutations"
 import actions from "./actions"
 import state from "./states"


 export default new Vuex.Store({
    mutations,
    actions,
    state
 })