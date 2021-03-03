<!--
 * @Author: your name
 * @Date: 2020-10-24 15:15:01
 * @LastEditTime: 2021-03-03 13:20:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\cart\components\head\Header.vue
-->
<template>
	<div id="cartHeader">
		<span>购物车</span>
		<span @click="clearCart">清空购物车</span>
	</div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
import { Dialog, Toast } from 'vant';

import {clearShopCart}  from "./../../../../service/index"
import { getItem } from '../../../../config/global';
	export default {
		name: "",
		computed:{
			...mapState(["shopCart"]),
		},
		methods:{
			...mapMutations(["CLEAR_SHOPCAT"]),
			async clearCart(){
				if(this.shopCart.length === 0){
					Toast({
						message:"购物车内没有商品，不可清除哦~~",
						duration: 800
					})
				}else{
					//显示遮罩层
					Dialog.confirm({
					  title: '温馨提示',
					  message: '您确认要清空购物车吗？',
					})
					  .then( async () => {
						//确认
						this.CLEAR_SHOPCAT();
						//服务器删除
						let result = await clearShopCart(getItem("userInfo"));

					  })
					  .catch(() => {
						//取消
						return;
					  });
					}
			}
		}
	};
</script>

<style scoped>
	#cartHeader {
		width: 100%;
		height: 2.7rem;
		line-height: 2.7rem;
		background-color: white;
		position: fixed;
		left: 0;
		top: 0;
		text-align: center;
		z-index: 2000;
	}
	#cartHeader span:nth-child(1) {
		font-size: 1.01rem;
		font-weight: bold;
	}
	#cartHeader span:nth-child(2) {
		font-size: 0.75rem;
		color: red;
		position: absolute;
		right: 0.5rem;
		bottom: -0.2rem;
	}
</style>
