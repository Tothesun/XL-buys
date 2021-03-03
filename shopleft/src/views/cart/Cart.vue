<!--
 * @Author: your name
 * @Date: 2020-10-14 17:55:17
 * @LastEditTime: 2020-12-06 10:30:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \06-vue基础+项目实战\shopleft\src\views\cart\Cart.vue
-->
<template>
	<div id="cart">
		<LoginPanel v-if="this.userInfo === null"/>
		<div v-else>
			<Header />
			<CartContent />
			<AccountBar />
		</div>
	</div>
</template>

<script>
	import Header from "./components/head/Header";
	import CartContent from "./components/cartcontent/CartContent";
	import AccountBar from "./components/accountbar/AccountBar";
	import LoginPanel from "./../login/LoginPanel";

	import {mapState} from "vuex"
	export default {
		name: "",

		components: {
			Header,
			CartContent,
			AccountBar,
			LoginPanel
		},
		computed:{
			...mapState(["shopCart","userInfo"]),
		},
		
	};
</script>

<style scoped>
	#cart {
		width: 100%;
		height: 100%;
	}
</style>
