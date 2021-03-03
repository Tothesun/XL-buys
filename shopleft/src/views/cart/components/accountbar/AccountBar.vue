<!--
 * @Author: your name
 * @Date: 2020-10-24 15:25:33
 * @LastEditTime: 2021-01-29 21:28:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\cart\components\accountbar\AccountBar.vue
-->
<template>
	<div id="accountBar">
		<input type="checkbox" id="input" :checked="whetherCheckedAll" @click="changeChecked(!whetherCheckedAll)"/>
		<span>全选</span>
		<div id="totalPrice">合计：<span>¥{{totalPrice | moneyFormat}}</span></div>
		<button id="submit" @click="confirmOrder">去结算(<span>{{countNum}}</span>)</button>


		<transition name="tranAnimate">
			<router-view/>
		</transition>
	</div>
</template>

<script>
import {mapState,mapMutations} from "vuex"

	export default {
		name: "",
		data() {
			return {
			
			};
		},
		computed:{
			...mapState(["shopCart"]),
			//去结算的商品数目：指的是不同商品的总数目，相同商品算一个
			countNum(){
				let i = 0;
				for(let key in this.shopCart){
					if(this.shopCart[key].checked){
						i++;
					}
				}
				return i;
			},
			//总价格
			totalPrice(){
				let allPrice = 0;
				for(let key in this.shopCart){
					let obj = this.shopCart[key];
					if(this.shopCart[key].checked){
						let price = Number(obj.num) * Number(obj.price);
						allPrice += price;
					}
				}
				return allPrice;
			},
			//所有商品是否全选
			whetherCheckedAll(){
				if(this.shopCart.length === 0){
					return false;
				}
				for(let key in this.shopCart){
					let obj = this.shopCart[key];
					if(!obj.checked){
					return false;
					}
				}
				return true;
			}
		},
		methods:{
			...mapMutations(["ALL_SELECTE"]),
			//改变是否选中
			changeChecked(flag){
				for(let key in this.shopCart){
					let obj = this.shopCart[key];
					obj.checked = flag;
				}
				this.ALL_SELECTE({
					flag: flag
				});
			},
			//去选中订单的页面
			confirmOrder(){
				this.$router.push("/dashboard/cart/confirmorder");
			}
		}
	};
</script>

<style scoped>
	#accountBar {
		width: 100%;
		height: 2.3rem;
		line-height: 2.3rem;
		position: fixed;
		bottom: 2.8rem;
		z-index: 2000;
		background-color: #f9f9f9;
	}
	#accountBar #input {
		margin-left: 0.5rem;
		margin-right: 0.3rem;
	}

	#accountBar #totalPrice {
		display: inline-block;
		margin-left: 2rem;
	}
	#accountBar #totalPrice span {
		color: red;
		font-size: 1.1rem;
	}
	#submit {
		display: inline-block;
		position: absolute;
		right: 0.4rem;
		width:6rem;
		height:2rem;
		line-height: 2rem;
		border: none;
		border-radius: 2rem;
		margin-top:0.15rem;
		background-color:red;
		color:white	
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
</style>
