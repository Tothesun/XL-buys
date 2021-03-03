<!--
 * @Author: your name
 * @Date: 2021-01-21 13:03:54
 * @LastEditTime: 2021-01-28 22:15:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\views\mine\children\MyAddress\addAddress.vue
-->
<template>
  <div id="add">
    <div style="position: fixed; width: 100%; height: 2rem; z-index: 100">
      <van-nav-bar title="新增地址" left-arrow @click-left="onClickLeft" />
    </div>
    <van-address-edit
      style="margin-top: 2.5rem"
      :area-list="areaList"
      show-postal
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
//引入省市文件
import areaList from "./../../../../../config/area.js";

//引入添加用户地址
import { addUserAddress, requestAddress } from "./../../../../../service/index";

//引入接口api
import { getItem } from "./../../../../../config/global";

//引入通知组件
import PubSub from "pubsub-js";

export default {
  data() {
    return {
      areaList: areaList,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    async onSave(content) {
      if (content.isDefault === true) {
        //请求后台数据，看是否已经存在默认地址
        let result = await requestAddress(getItem("userInfo"));
        if (result.status === 200) {
          //如果存在默认地址，就不能添加
          for (let i = 0; i < result.result.length; i++) {
            if (result.result[i].isDefault === true) {
              Toast({
                message: "已经存在默认地址！",
                duration: 800,
              });
              return;
            }
          }
        }
      }
      let result = await addUserAddress(
        getItem("userInfo"),
        content.name,
        content.tel,
        content.province,
        content.city,
        content.county,
        content.areaCode,
        content.addressDetail,
        content.postalCode,
        content.isDefault
      );

      if (result.status === 200) {
        //提示信息修改成功
        Toast({
          message: "地址新添成功！",
          duration: 800,
        });

        //返回页面
        this.$router.back();

        //通知
        PubSub.publish("addAddressSuccess");
      }
    },
  },
};
</script>

<style>
#add {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 1000px;
  background-color: #f5f5f5;
  z-index: 1000;
}
</style>