<!--
 * @Author: your name
 * @Date: 2021-01-21 13:03:54
 * @LastEditTime: 2021-01-29 12:19:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\views\mine\children\MyAddress\addAddress.vue
-->
<template>
  <div id="add">
    <div style="position: fixed; width: 100%; height: 2rem; z-index: 100">
      <van-nav-bar title="编辑地址" left-arrow @click-left="onClickLeft" />
    </div>
    <van-address-edit
      style="margin-top: 2.5rem"
      :area-list="areaList"
      :address-info="AddressInfo"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from "vant";

//引入省市文件
import areaList from "./../../../../../config/area.js";

import { requestOneAddress, editAddress,deleteAddress,requestAddress } from "./../../../../../service/index";

import {getItem} from "./../../../../../config/global"


import PubSub from "pubsub-js"

export default {
  data() {
    return {
      areaList: areaList,
      searchResult: [],
      AddressInfo: {},
    };
  },
  mounted() {
    this.requestOne();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    //保存联系人信息
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

      let addressId = this.$route.query.address_id;

      let result = await editAddress(
        addressId,
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
      )

      //处理结果
      if(result.status === 200){
        //提示信息修改成功
        Toast({
          message:"地址信息修改成功！",
          duration: 800
        })
        
        //页面返回
        this.$router.back();

        //通知数据重新请求
        PubSub.publish("addAddressSuccess");
      }else{
        Toast({
          message:"服务器内部错误！",
          duration: 800
        })
      }
    },

    //删除联系人信息
    async onDelete(content) {
      let address_id = this.$route.query.address_id;
      let result = await deleteAddress(address_id);

      
      //处理结果
      if(result.status === 200){
        //提示信息修改成功
        Toast({
          message:"地址删除成功！",
          duration: 800
        })
        
        //页面返回
        this.$router.back();

        //通知数据重新请求
        PubSub.publish("addAddressSuccess");
      }else{
        Toast({
          message:"服务器内部错误！",
          duration: 800
        })
      }
    },

    //请求一个地址
    async requestOne() {
      //取参数
      let address_id = this.$route.query.address_id;
      let result = await requestOneAddress(address_id);
      let data = result.result;

      //数据注入
      if (result.status === 200) {
        this.AddressInfo = {
          name: data.addressName,
          tel: data.tel,
          province: data.province,
          city: data.city,
          county: data.county,
          addressDetail: data.addressDetail,
          areaCode: data.areaCode,
          postalCode: data.postalCode,
          isDefault: data.isDefault,
        };
      }

    },
  },
};
</script>

<style>
#add {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 1000;
}
</style>