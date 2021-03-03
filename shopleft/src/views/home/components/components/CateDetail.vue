<!--
 * @Author: your name
 * @Date: 2020-10-21 21:25:05
 * @LastEditTime: 2020-10-22 14:54:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\home\components\components\CateDetail.vue
-->
<template>
	<div id="cateDetail">
		<img
			:src="cate.icon_url"
			alt="cate.name"
			style="width:2.7rem;height:2.7rem;"
		/>
		<p>{{cate.name}}</p>
	</div>
</template>

<script>
	export default {
		name: "",
		props:{
			cate:Object
		}
	};
</script>

<style scoped>
	#cateDetail {
		width: 4.2rem;
		height: 5.5rem;
		text-align: center;
		float: left;
	}
	#cateDetail img {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		border-radius: 50%;
	}
	#cateDetail p {
		font-size: 0.7rem;
	}
</style>
