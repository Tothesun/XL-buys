<!--
 * @Author: your name
 * @Date: 2021-01-21 12:35:46
 * @LastEditTime: 2021-01-29 15:20:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\views\mine\children\myAddress\myAddress.vue
-->
<template>
  <div id="address">
    <div style="position: fixed; width: 100%; height: 2rem; z-index: 100">
      <van-nav-bar title="我的地址" left-arrow @click-left="onClickLeft" />
    </div>

    <van-empty
      description="还没有地址哦，快去添加"
      style="margin-bottom: 2rem"
      v-if="empty"
    />
    <van-address-list
      style="margin-top: 2.4rem"
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="addUser"
    />

    <transition name="tranAnimate">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { Toast } from "vant";

import { getItem } from "./../../../../config/global";

import { requestAddress } from "./../../../../service/index";

import PubSub from "pubsub-js"

export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
      empty: false,
    };
  },
  mounted() {
    this.requestAddressData();

    //消息监听
    PubSub.subscribe("addAddressSuccess", (msg) => {
      if (msg === "addAddressSuccess") {
        this.requestAddressData();
      }
    });
  },
  methods: {
    //新增用户地址
    onAdd() {
      this.$router.push("/dashboard/myaddress/addaddress");
    },

    //编辑用户地址
    onEdit(item, index) {
      //路由切换
      this.$router.push(
        "/dashboard/myaddress/editaddress?address_id=" + item.address_id
      );
    },

    //点击标题左边退回
    onClickLeft() {
      this.$router.go(-1);
    },

    //请求用户数据
    async requestAddressData() {
      //1.请求地址数据
      let result = await requestAddress(getItem("userInfo"));
      let data = result.result;

      if (data === undefined) {
        this.empty = true;
      } else {
        this.empty = false;
        //生成之前要先清空
        this.list = [];

        //2.生成前台地址数据
        for (let i = 0; i < data.length; i++) {
          let newList = {
            id: String(i + 1),
            name: data[i].addressName,
            tel: data[i].tel,
            address:
              data[i].province +
              data[i].city +
              data[i].county +
              data[i].addressDetail,
            isDefault: data[i].isDefault,
            address_id: data[i]._id,
          };
          if (data[i].isDefault) {
            this.chosenAddressId = String(i + 1);
          }
          this.list.push(newList);
        }
      }
    },

    //购物车页面新增用户地址
    addUser(item,index){
      let flag = this.$route.query.flag;
      
      if(flag === "1"){  //从购物车页面进来
        let data = {
          name:item.name,
          tel:item.tel
        }
        PubSub.publish("getUserAddress",data)
        
        
        this.$router.back();
      }
    }
  },
};
</script>

<style>
#address {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 200;
}

/* 转场动画 */
.tranAnimate-leave-active,
.tranAnimate-enter-active {
  transition: all 0.5s;
}
.tranAnimate-leave-to,
.tranAnimate-enter {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>