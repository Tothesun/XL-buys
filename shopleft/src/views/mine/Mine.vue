<template>
  <div id="mine">
    <LoginPanel v-if="this.userInfo === null" />
    <div v-else>
      <!-- 头部区域 -->
      <van-nav-bar id="header" :border="false" title="我的" />

      <!-- 头像区域 -->
      <van-cell id="profile" @click="toMyCenter">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <img id="imageHua" src="@/images/default.jpg" alt="" />
          <div id="nameAndTel">
            <span>昵称：sei238hry!x~\ne</span>
            <span>电话：{{ userInfo }}</span>
          </div>
        </template>
      </van-cell>

      <!-- 我的订单 -->
      <van-cell-group>
        <van-cell
          title="我的订单"
          value="查看所有订单"
          icon="todo-list-o"
          @click="toAllOrder"
        />
      </van-cell-group>

      <!-- 四宫格 -->
      <van-grid>
        <van-grid-item icon="gold-coin-o" text="全部" @click="detail1" />
        <van-grid-item icon="gift-card-o" text="待支付" @click="detail2" />
        <van-grid-item icon="comment-o" text="待收货" @click="detail3" />
        <van-grid-item icon="smile-o" text="待评价/售后" @click="detail4" />
      </van-grid>

      <!-- 我的优惠券 -->
      <van-cell-group style="margin-top: 0.5rem">
        <!-- 优惠券单元格 -->
        <van-coupon-cell
          icon="coupon-o"
          title="我的优惠券"
          :coupons="coupons"
          @click="showCuponPanel"
        />
        <!-- 优惠券列表 -->
        <van-popup
          v-model="showList"
          position="bottom"
          style="height: 90%; padding-top: 4px; position: fixed"
        >
          <van-coupon-list
            input-placeholder="请输入优惠码(至少1位)"
            :coupons="coupons"
            :disabled-coupons="disabledCoupons"
            :show-close-button="false"
            @exchange="onExchange"
          />
        </van-popup>

        <van-cell
          icon="wap-home-o"
          title="我的收货地址"
          is-link
          @click="toMyAddress"
        />
      </van-cell-group>

      <!-- 客服 -->
      <van-cell-group style="margin-top: 0.5rem">
        <van-cell title="联系客服" icon="service-o" is-link>
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <span style="color: #969799">客服时间07:00-22:00</span>
          </template>
        </van-cell>
        <van-cell icon="chat-o" title="意见反馈" is-link @click="goMyIdea" />
      </van-cell-group>

      <!-- 下载app -->
      <van-cell-group style="margin-top: 0.5rem">
        <van-cell
          icon="thumb-circle-o"
          title="小廖买菜"
          value="下载APP体验更佳"
          is-link
          @click="showPopup"
        />
        <van-popup v-model="show">
          <img
            src="@/images/code.jpeg"
            alt=""
            style="width: 10rem; height: 10rem"
          />
        </van-popup>
      </van-cell-group>

      <transition name="tranAnimate">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import LoginPanel from "./../login/LoginPanel";

import { mapState } from "vuex";

import { addCupon, reqAllCupon } from "./../../service/index";

import { getItem } from "./../../config/global";
import { Toast } from 'vant';

const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};

export default {
  name: "",
  data() {
    return {
      show: false,

      showList: false,
      coupons: [],
      disabledCoupons: [],
    };
  },
  mounted(){
    this.initCupon();
  },
  components: {
    LoginPanel,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    toMyCenter() {
      this.$router.push("/dashboard/mine/loginout");
    },
    toAllOrder() {
      this.$router.push("/dashboard/mine/allorder");
    },
    toMyAddress() {
      this.$router.push("/dashboard/myaddress");
    },
    detail1() {
      this.$router.push("/dashboard/mine/allorder?flag=1");
    },
    detail2() {
      this.$router.push("/dashboard/mine/allorder?flag=2");
    },
    detail3() {
      this.$router.push("/dashboard/mine/allorder?flag=3");
    },
    detail4() {
      this.$router.push("/dashboard/mine/allorder?flag=4");
    },

    goMyIdea() {
      this.$router.push("/dashboard/mine/idea");
    },

    /* 展示优惠券的面板 */
    showCuponPanel() {
      this.showList = true;
    },

    //展示该app的二维码
    showPopup() {
      //展示优惠券的面板
      this.show = true;
    },

    //数据初始化
    async initCupon(){
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
          if(cupon.available === 0){
            this.disabledCoupons.push(cupon);
          }else{
            this.coupons.push(cupon);
          }
        }
      }
    },

    /* 兑换优惠券 */
    async onExchange(code) {
      this.coupons.push(coupon);
      //发起添加的请求
      let result = await addCupon(getItem("userInfo"), code);
      if(result.status === 200){
        Toast({
          message:"优惠券兑换成功！",
          duration: 800
        })
      }

      //重新请求数据进行刷新
      this.initCupon();
    },
  },
};
</script>

<style scoped>
#mine {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
#header {
  background-color: red;
}
.van-nav-bar >>> .van-nav-bar__title {
  color: white !important;
  font-size: 1.05rem;
}

#profile {
  position: relative;
  background-color: red;
}
#imageHua {
  width: 3.7rem;
  height: 3.7rem;
  border-radius: 50%;
  border: 2px solid white;
}
#nameAndTel {
  height: 100%;
  position: absolute;
  left: 5rem;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 0.5rem;
  color: white;
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

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}

/* 优惠券不能选中 */
.van-checkbox__icon .van-icon {
  display: none !important;
}
</style>