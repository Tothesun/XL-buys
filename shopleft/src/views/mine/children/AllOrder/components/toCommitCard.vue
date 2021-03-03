<!--
 * @Author: your name
 * @Date: 2021-02-01 17:10:37
 * @LastEditTime: 2021-02-04 10:29:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\views\mine\children\AllOrder\components\allOrder.vue
-->
<template>
  <div id="orderCard">
    <van-card
      :num="this.list.num"
      :price="this.list.price"
      :desc="this.list.description"
      :title="this.list.name"
      :thumb="this.list.img"
      style="margin-top:0"
    />

   
</template>

<script>

import {moneyFormat} from "./../../../../../config/filter"

export default {
  data(){
    return {

    }
  },
  props:{
    
    list:Object,
 
  }
};
</script>

<style>
#orderCard {
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 200;
  overflow:hidden;
}
</style>