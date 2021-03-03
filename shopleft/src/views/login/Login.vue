<template>
  <div id="login">
      <div id="loginPan">
            <span>手机号：</span><input type="num"  v-model="userPhone">
            <br><br>
            <span>验证码：</span><input type="text" v-model="userCode">
            <button class="send" ref="sendCode" @click="sendCode()">{{this.sendACode}}</button>

            <button id="loginNow" @click="login">登录</button>
            <button id="goBack" @click="goBack">返回</button>
      </div>
  </div>
</template>

<script>

    import {Toast} from "vant"

    import {getPhoneCode,codeLogin,requestUserData} from "./../../service/index"

    import {mapState,mapMutations} from "vuex"
    import {setItem,getItem} from "./../../config/global"

export default {
    data(){
        return {
            //用户手机号
            userPhone:"",
            //登录验证码
            userCode:"",
            //发送验证码&计时秒数
            sendACode: "发送"
        }
    },
    computed:{
			...mapState(["userInfo","shopCart"]),
	},
    methods:{
        ...mapMutations(["ADD_USERINFO","ADD_SHOPCART"]),

        //返回上一级
        goBack(){
            this.$router.go(-1);
        },

        //发送验证码
        async sendCode(){
            if(!this.userPhone){
                Toast({
                    message:"请输入手机号码",
                    duration: 800
                })
                return;
            }else if(/^[1][3,5,7,8][0-9]{9}$/.test(this.userPhone)){//手机号码进行验证
                //让按钮不可触发
                this.$refs["sendCode"].disabled = true;

                //改变计时器
                let num = 59,timer;
                timer = setInterval(()=>{
                    this.sendACode = num;
                    if(num === 0){ 
                        clearTimeout(timer);
                        this.sendACode = "发送";
                        this.$refs["sendCode"].disabled = false;
                    }
                    num--;
                },1000)

                //发送请求
                let response = await getPhoneCode(this.userPhone);
                console.log(response); 

            }else{
                Toast({
                    message:"请输入正确的电话号码",
                    duration:500
                })
            }
        },

        //登录
        async login(){
            
            //1.登录
            let response = await codeLogin(this.userPhone, this.userCode);
            console.log(response); 

            //2.同步数据到vuex，和本地
            if(response.status === 200){
                this.ADD_USERINFO({userInfo: response.result.phone}); 
                setItem("userInfo", response.result.phone); 
            }
            
            //3.页面返回
            this.$router.go(-1);

            //4.请求数据
            let userData = await requestUserData(getItem("userInfo"));
            console.log(userData);
            if(userData.status === 200){
                //4.1同步购物车数据到vuex
                this.ADD_SHOPCART({products: userData.result.data}); 
            }

        }
    }
}
</script>

<style>
    #login{
        width:100%;
        height: 100%;
        background-color:#f5f5f5;
        position: fixed;
    }
    #loginPan{
        width: 95%;
        height:10rem;
        position: relative;
        left:15%;
        top:35%;
    }
    #login input{
        width:8rem;
    }
    #loginPan .send{
        margin-left:0.2rem;
        font-size:0.9rem;
        width:2.5rem;
    }

    #loginNow{
        position: absolute;
        width:9rem;
        height:2rem;
        top:60%;
        left:20%;
        background-color:red;
        color:white;
        border:none;
    }
    #goBack{
        position: absolute;
        width:9rem;
        height:2rem;
        top:95%;
        left:20%;
        background-color:white;
        border:0.1rem solid #ccc;
    }
</style>