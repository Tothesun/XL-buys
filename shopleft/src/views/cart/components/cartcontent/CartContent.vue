<!--
 * @Author: your name
 * @Date: 2020-10-24 15:21:42
 * @LastEditTime: 2020-10-27 18:04:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\cart\components\cartcontent\CartContent.vue
-->
<template>
	<div id="cartContent">
		<ContentItem v-for="shop in shopCart" :key="shop.id" :product="shop"/>
	</div>
</template>

<script>
	import ContentItem from "./components/ContentItem";

	import {mapState} from "vuex"

	export default {
		name: "",
		data(){
			return {
				
			}
		},
		components: {
			ContentItem,
		},
		computed:{
			...mapState(["shopCart"]),
		},
	};
</script>

<style scoped>
	#cartContent {
		width: 100%;
		height: 77%;
		position: fixed;
		margin-top: 3.4rem;
		overflow: auto;
	}
</style>
