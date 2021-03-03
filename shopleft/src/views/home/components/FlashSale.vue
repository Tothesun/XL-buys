<!--
 * @Author: your name
 * @Date: 2020-10-21 21:36:18
 * @LastEditTime: 2020-10-22 11:47:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\home\components\FlashItem.vue
-->
<template>
	<div id="FlashSale">
		<div id="flashSaleTop">
			<span></span>
			<span>限时抢购</span>
			<span>07:00场</span>
			<span>已结束</span>
			<span>更多</span>
		</div>
		<div id="flashSaleBottom">
			<FlashDetail v-for="flashItem in flash_list" :key="flashItem.icd" :flashItem="flashItem"/>
		</div>
	</div>
</template>

<script>
	import FlashDetail from "./components/FlashDetail";

	export default {
		name: "",
		props:{
			flash_list: Array,
		},
		components: {
			FlashDetail,
		},

	};
</script>

<style scoped>
	#FlashSale {
		margin-top: 0.6rem;
		width: 100%;
		height: 17.5rem;
		background-color: #fff;
		position: relative;
		overflow: hidden;
	}
	#FlashSale #flashSaleTop {
		margin-top: 1rem;
		width: 100%;
		height: 3rem;
		position: relative;
	}
	#flashSaleTop span:nth-child(1) {
		margin-left: 0.7rem;
		margin-right: 0.5rem;
		width: 0.3rem;
		height: 1.8rem;
		background-color: red;
		display: inline-block;
	}
	#flashSaleTop span:nth-child(2) {
		font-size: 1.2rem;
		position: absolute;
		top: 0.2rem;
	}
	#flashSaleTop span:nth-child(3) {
		position: absolute;
		left: 6.8rem;
		top: 0.4rem;
		color: red;
		font-size: 0.9rem;
	}
	#flashSaleTop span:nth-child(4) {
		position: absolute;
		left: 10.5rem;
		top: 0.35rem;
		font-size: 0.92rem;
		border: 1px solid #666;
		border-radius: 4px;
		color: #666;
	}
	#flashSaleTop span:nth-child(5) {
		position: absolute;
		top: 0.3rem;
		right: 0.4rem;
		font-size: 0.9rem;
		color: red;
	}

	#flashSaleBottom {
		white-space: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
	}
</style>
