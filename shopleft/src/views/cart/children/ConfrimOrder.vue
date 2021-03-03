<!--
 * @Author: your name
 * @Date: 2021-01-20 20:05:49
 * @LastEditTime: 2021-03-03 13:23:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\views\cart\children\ConfrimOrder.vue
-->
<template>
  <div id="confirmOrder">
    <div style="position: fixed; width: 100%; height: 2rem; z-index: 100">
      <van-nav-bar title="确认订单" left-arrow @click-left="onClickLeft" />
    </div>

    <van-contact-card
      v-if="flag"
      style="margin-top: 3rem"
      type="add"
      @click="onAdd"
    />
    <van-contact-card
      v-else
      style="margin-top: 3rem"
      type="edit"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="onAdd"
    />

    <!-- 优惠券单元格 -->
    <van-coupon-cell
      style="margin-top: 1rem"
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <van-coupon-list
        input-placeholder="请输入优惠码(至少1位)"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        :value="2"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>

    <van-cell-group style="margin-top: 0.8rem">
      <van-cell title="商品清单" />
      <van-card
        :num="shop.num"
        :price="shop.price"
        :title="shop.name"
        :thumb="shop.image"
        v-for="shop in this.filterMethod"
        :key="shop.id"
      />
    </van-cell-group>

    <van-cell-group style="margin-top: 0.8rem; margin-bottom: 2rem">
      <van-cell title="商品留言" />
      <div>
        <textarea />
      </div>
    </van-cell-group>

    <van-submit-bar
      id="submitBar"
      :price="this.totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";

//引入vuex
import { mapState } from "vuex";

import PubSub from "pubsub-js";

import { getItem } from "./../../../config/global";

import { reqAllCupon, addCupon, submitOrder,getWXCode } from "./../../../service/index";

export default {
  data() {
    return {
      flag: true,
      currentContact: "",

      showList: false,

      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      subMoney: 0,
    };
  },
  mounted() {
    this.getAddress();
    this.initCupon();
  },
  computed: {
    ...mapState(["shopCart"]),

    //过滤购物车的数据
    filterMethod(shopCart) {
      let result = [];
      for (let key in this.shopCart) {
        let obj = this.shopCart[key];
        if (this.shopCart[key].checked) {
          result.push(this.shopCart[key]);
        }
      }
      return result;
    },

    //计算总价格
    totalPrice() {
      let allPrice = 0;
      for (let key in this.filterMethod) {
        let obj = this.filterMethod[key];
        let price = Number(obj.num) * Number(obj.price);
        allPrice += price;
      }
      return (allPrice - this.subMoney) * 100;
    },
  },
  methods: {
    //数据初始化
    async initCupon() {
      //请求优惠券的数据
      let result = await reqAllCupon(getItem("userInfo"));
      this.disabledCoupons = [];
      this.coupons = [];
      if (result.status === 200) {
        //数据注入
        let data = result.result;
        for (let i = 0; i < data.length; i++) {
          let cupon = {
            available: data[i].isAvailable ? 1 : 0,
            condition: data[i].condition,
            reason: data[i].reason,
            value: data[i].value,
            name: data[i].name,
            startAt: data[i].startAt,
            endAt: data[i].endAt,
            valueDesc: String(data[i].value / 100),
            unitDesc: "元",
          };
          if (cupon.available === 0) {
            this.disabledCoupons.push(cupon);
          } else {
            this.coupons.push(cupon);
          }
        }
      }
    },

    //点击标题左边退回
    onClickLeft() {
      this.$router.go(-1);
    },

    //点击新增，新增联系人
    onAdd() {
      this.$router.push("/dashboard/myaddress?flag=1");
    },

    //提交订单事件
    async onSubmit() {
      //数据验证性操作
      if (this.filterMethod.length <= 0) {
        Toast({
          message: "商品列表不能为空！",
          duration: 800,
        });
      } else if(this.flag){
        Toast({
          message: "联系人不能为空！",
          duration: 800,
        });
      }else {
        //假如数据正确
        //1.提交后台创建订单
        let newProduct = [];
        for(let i = 0; i < this.filterMethod.length; i++) {
          let goods = { 
            name: this.filterMethod[i].name, 
            img: this.filterMethod[i].image,
            description: "",
            price: this.filterMethod[i].price,
            num: this.filterMethod[i].num,
          }
          newProduct.push(goods);
        }
        let result = await submitOrder(
            getItem("userInfo"),
            "待支付",
            JSON.stringify(newProduct),
            this.totalPrice / 100 + this.subMoney,
            this.subMoney,
            (this.totalPrice)/100,
            "需支付"
        );
        if(result.status === 200){
            Toast({
              message: "订单创建成功，目前不能集成支付！",
              duration: 800,
          });
        }
      }
    },

    //提取联系人信息
    getAddress() {
      PubSub.subscribe("getUserAddress", (msg, data) => {
        if (msg === "getUserAddress") {
          this.flag = false;
          //数据注入
          this.currentContact = data;
        }
      });
    },

    //选中某个可用的优惠券
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      if (this.chosenCoupon !== -1) {
        this.subMoney = this.coupons[this.chosenCoupon].value * 0.01;
      }
    },

    //点击兑换，进行兑换优惠券
    async onExchange(code) {
      this.coupons.push(coupon);
      console.log(code);
      //发起添加的请求
      let result = await addCupon(getItem("userInfo"), code);

      if (result.status === 200) {
        Toast({
          message: "优惠券兑换成功！",
          duration: 800,
        });
      }

      //重新请求数据进行刷新
      this.initCupon();
    },
  },
};
</script>

<style>
#confirmOrder {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  overflow-x: hidden;
  overflow-y: scroll;
}
textarea {
  width: 86%;
  height: 100px;
  margin: 0.2rem 7%;
  font-size: 0.8rem;
  box-sizing: border-box;
}
#submitBar {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
