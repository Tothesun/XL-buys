/*
 * @Author: your name
 * @Date: 2020-12-06 19:02:16
 * @LastEditTime: 2020-12-06 19:16:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\config\fileter.js
 */
import Vue from "vue"

Vue.filter("moneyFormat",(value)=>{
    return Number(value).toFixed(2);
})
