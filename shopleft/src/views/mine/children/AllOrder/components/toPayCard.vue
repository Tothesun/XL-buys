<!--
 * @Author: your name
 * @Date: 2021-02-01 17:10:37
 * @LastEditTime: 2021-02-04 10:33:35
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

  </div>
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
#title {
  position:relative;
  right: 0.5rem;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: right;
  font-size: 0.8rem;
  color: red;
  font-weight: 400;

}
#priceDetail{
  position: relative;
  right: 0.5rem;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  text-align: right;
  font-size: 0.8rem;
 
}
</style>