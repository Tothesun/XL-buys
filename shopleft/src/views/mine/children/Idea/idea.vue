<!--
 * @Author: your name
 * @Date: 2021-01-29 16:47:21
 * @LastEditTime: 2021-01-30 18:52:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\views\mine\children\Idea\idea.vue
-->

<template>
  <div id="idea">
    <div style="position: fixed; width: 100%; height: 2rem; z-index: 100">
      <van-nav-bar title="我的建议" left-arrow @click-left="onClickLeft" />
    </div>

    <textarea id="myText" placeholder="请写出您的建议和意见！"></textarea>

    <van-button
      plain
      type="info"
      style="
        position: absolute;
        top: 17rem;
        left: 38%;
        width: 5rem;
        height: 2rem;
      "
      @click="submmitIdea"
      >提交</van-button
    >
  </div>
</template>

<script>
import { submmitIdea } from "./../../../../service/index";

import $ from "jquery";

import { getItem } from "./../../../../config/global";
import { Toast } from "vant";

export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    async submmitIdea() {
      //获取用户数据
      let content = $("#myText").val();
      if (content) {
        //后台发送
        let result = await submmitIdea(getItem("userInfo"), content);

        //结果处理
        if (result.status === 200) {
          Toast({
            message: "您的意见我们已经收到，我会继续努力的！",
            duration: 700,
          });

          this.$router.go(-1);
        } else {
          Toast({
            message: result.message,
            duration: 700,
          });
        }
      } else {
        Toast({
          message: "内容不能为空哦~",
          duration: 800,
        });
      }
    },
  },
};
</script>

<style>
#idea {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 200;
}
#myText {
  display: inline-block;
  width: 85%;
  height: 12rem;
  position: absolute;
  left: 4.3%;
  top: 3rem;
  padding: 0.6rem;
  font-size: 0.9rem;
}
</style>