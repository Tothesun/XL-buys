<!--
 * @Author: your name
 * @Date: 2020-10-21 21:17:34
 * @LastEditTime: 2020-10-22 14:54:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\home\components\Cate.vue
-->
<template>
	<div id="cate">
		<CateDetail v-for="cate in categogy_list" :key="cate.cid" :cate="cate"/>
	</div>
</template>

<script>
	import CateDetail from "./components/CateDetail";
	export default {
		name: "",
		props:{
			categogy_list: Array,
		},
		components: {
			CateDetail,
		},
		
	};
</script>

<style scoped>
	#cate {
		width: 100%;
		height: 11rem;
		background-color: #fff;
	}
</style>
