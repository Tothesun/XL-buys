<!--
 * @Author: your name
 * @Date: 2020-10-14 18:03:30
 * @LastEditTime: 2021-01-17 12:40:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \06-vue基础+项目实战\shopleft\src\views\dashboard\DashBoard.vue
-->
<template>
	<div id="dashboard">
		<van-tabbar v-model="active" active-color="#ff0000">
			<van-tabbar-item to="/dashboard/home" @click="setIndex(0)">
				<span>首页</span>
				<template #icon="props">
					<img :src="props.active ? home_icon.active : home_icon.inactive" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="/dashboard/category" @click="setIndex(1)">
				<span>分类</span>
				<template #icon="props">
					<img
						:src="props.active ? category_icon.active : category_icon.inactive"
					/>
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="/dashboard/cart" @click="setIndex(2)" :badge="topIndex===0 ? '': topIndex">
				<span>购物车</span>
				<template #icon="props">
					<img :src="props.active ? cart_icon.active : cart_icon.inactive" />
				</template>
			</van-tabbar-item>
			<van-tabbar-item to="/dashboard/mine" @click="setIndex(3)">
				<span>我的</span>
				<template #icon="props">
					<img :src="props.active ? mine_icon.active : mine_icon.inactive" />
				</template>
			</van-tabbar-item>
		</van-tabbar>
		<keep-alive>
			<router-view/>
		</keep-alive>
	</div>
</template>

<script>
	//1.引入存储函数
	import {setItem,getItem} from "./../../config/global"

	//2.引入购物车数据
	import {mapState,mapMutations} from "vuex"

	//3.引入数据初始化api
	import {requestUserData} from "./../../service/index"


	export default {
		name: "",
		data() {
			return {
				//1.tabbar数据
				active: Number(getItem("currentIndex")) || 0,
				home_icon: {
					active: require("./../../images/home_active.png"),
					inactive: require("./../../images/home_normal.png"),
				},
				category_icon: {
					active: require("./../../images/category_active.png"),
					inactive: require("./../../images/category_normal.png"),
				},
				cart_icon: {
					active: require("./../../images/cart_active.png"),
					inactive: require("./../../images/cart_normal.png"),
				},
				mine_icon: {
					active: require("./../../images/mine_active.png"),
					inactive: require("./../../images/mine_normal.png"),
				},
			};
		},
		mounted(){
			this.initData;
		},
		computed:{
			...mapState(["shopCart","userInfo"]),
			//首页开始同步数据
			async initData(){ 
				//本地客户信息同步
				let userInfo = getItem("userInfo");
				if(userInfo !== ""){
					this.ADD_USERINFO({
						userInfo:userInfo
					})
				}
				//购物车数据同步
				let userData = await requestUserData(userInfo);
            	if(userData.status === 200){
            	    //同步购物车数据到vuex
            	    this.ADD_SHOPCART({products: userData.result.data}); 
            	}
			},
			topIndex(){
				let totalNum = 0;
				if(this.shopCart.length === 0){
					return 0;
				}else{

					for(let key in this.shopCart){
						totalNum += this.shopCart[key].num;
					}
				}
				return totalNum;
			}
		},
		methods:{
			...mapMutations(["ADD_USERINFO","ADD_SHOPCART"]),
			setIndex(index){
				setItem("currentIndex",index);
			}
		}
	};
</script> 

<style scoped>
	#dashboard {
		width: 100%;
		height: 100%;
	}
</style>
