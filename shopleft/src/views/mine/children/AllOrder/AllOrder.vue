<!--
 * @Author: your name
 * @Date: 2021-01-21 12:13:24
 * @LastEditTime: 2021-03-03 13:20:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\views\mine\children\AllOrder\AllOrder.vue
-->
<template>
  <div id="allOrder">
    <div style="position: fixed; width: 100%; height: 2rem; z-index: 300">
      <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    </div>

    <van-tabs v-model="active" style="margin-top: 2.4rem; positon: fixed">
      <van-tab title="全部">
        <ul class="orderUl">
          <li v-for="alllist in this.allOrderList" :key="alllist.id">
            <div id="title">{{ alllist.title }}</div>
            <allOrderCard v-for="(list,index) in alllist.product" :key="index" :list="list"/>
            <div id="priceDetail">
              总价:￥{{ alllist.allPrice | moneyFormat }}元，优惠:{{
                alllist.discounts | moneyFormat
              }}元，{{ alllist.lastText }}:￥{{
                alllist.lastPrice | moneyFormat
              }}元
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab title="待支付">
        <ul class="orderUl">
          <li v-for="topaylist in this.toPayList" :key="topaylist.id">
            <div id="title">{{ topaylist.title }}</div>
            <allOrderCard v-for="(list,index) in topaylist.product" :key="index" :list="list"/>
            <div id="priceDetail">
              总价:￥{{ topaylist.allPrice | moneyFormat }}元，优惠:{{
                topaylist.discounts | moneyFormat
              }}元，{{ topaylist.lastText }}:￥{{
                topaylist.lastPrice | moneyFormat
              }}元
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab title="待收货">
        <ul class="orderUl">
          <li v-for="togetlist in this.toGetList" :key="togetlist.id">
            <div id="title">{{ togetlist.title }}</div>
            <allOrderCard v-for="(list,index) in togetlist.product" :key="index" :list="list"/>
            <div id="priceDetail">
              总价:￥{{ togetlist.allPrice | moneyFormat }}元，优惠:{{
                togetlist.discounts | moneyFormat
              }}元，{{ togetlist.lastText }}:￥{{
                togetlist.lastPrice | moneyFormat
              }}元
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab title="待评价">
        <ul class="orderUl">
          <li v-for="tocommitlist in this.toCommitList" :key="tocommitlist.id">
            <div id="title">{{ tocommitlist.title }}</div>
            <toCommitCard v-for="(list,index) in tocommitlist.product" :key="index" :list="list"/>
            <div id="priceDetail">
              总价:￥{{ tocommitlist.allPrice | moneyFormat }}元，优惠:{{
                tocommitlist.discounts | moneyFormat
              }}元，{{ tocommitlist.lastText }}:￥{{
                tocommitlist.lastPrice | moneyFormat
              }}元
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import allOrderCard from "./components/allOrderCard";
import toPayCard from "./components/toPayCard";
import toGetCard from "./components/toGetCard";
import toCommitCard from "./components/toCommitCard";

import { getItem } from "../../../../config/global";

import { reqAllCupon, requestOrderData } from "./../../../../service/index";

import { moneyFormat } from "./../../../../config/filter";

export default {
  data() {
    return {
      active: 0,
      allOrderList: [],
      toPayList: [],
      toGetList: [],
      toCommitList: [],
    };
  },
  mounted() {
    let flag = this.$route.query.flag;
    this.active = Number(flag) - 1;

    //请求订单数据
    this.initOrderData();
  },
  components: {
    allOrderCard,
    toPayCard,
    toGetCard,
    toCommitCard,
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    //请求订单数据
    async initOrderData() {
      //数据初始化
      this.allOrderList = [];
      this.toPayList = [];
      this.toGetList = [];
      this.toCommitList = [];
      //请求
      let result = await requestOrderData(getItem("userInfo"));
      let data = result.result;

      //注入页面
      for (let i = 0; i < data.length; i++) {
        let newData = {
          title: data[i].title,
          product: JSON.parse(data[i].product),
          allPrice: data[i].allPrice,
          discounts: data[i].discounts,
          lastPrice: data[i].lastPrice,
          lastText: data[i].lastText,
        };
        this.allOrderList.push(newData);
        if (newData.title === "待支付") {
          this.toPayList.push(newData);
        } else if (newData.title === "待收货") {
          this.toGetList.push(newData);
        } else {
          this.toCommitList.push(newData);
        }
      }
    },
  },
};
</script>

<style>
#allOrder {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #f5f5f5;
  z-index: 200;
}
.orderUl {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.orderUl li {
  width: 95%;
  margin: 0.5rem;
  box-sizing: border-box;
  background-color: white;
}

#title {
  position: relative;
  right: 0.5rem;
  width: 100%;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: right;
  font-size: 0.8rem;
  color: red;
  font-weight: 400;
}

#priceDetail {
  position: relative;
  right: 0.5rem;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  text-align: right;
  font-size: 0.8rem;
}
</style>