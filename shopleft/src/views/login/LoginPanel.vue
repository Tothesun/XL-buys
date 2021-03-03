<template>
  <div id="loginPanel">

      <p>选择登录方式</p>
      <div id="phoneLogin" @click="changeRoute">手机登录</div>
  </div>
</template>

<script>
export default {
    methods:{
        changeRoute(){
            this.$router.push("/login");
        }
    }
}
</script>

<style>
    #loginPanel{
        width:100%;
        height: 100%;
        background-color: #f5f5f5;
        position: relative;
    }
    #loginPanel p{
        position: absolute;
        top:45%;
        width: 100%;
        text-align: center;
    }
    #phoneLogin{
        position: absolute;
        top:50%;
        width:60%;
        height:2.5rem;
        line-height: 2.5rem;
        text-align: center;
        color:white;
        left:20%;
        background-color:red;
        border-radius: 0.3rem;
        border:none;
    }
</style>