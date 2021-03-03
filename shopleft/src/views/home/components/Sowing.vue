<!--
 * @Author: your name
 * @Date: 2020-10-21 20:22:32
 * @LastEditTime: 2020-10-22 10:12:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit 
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\home\components\Sowing.vue
-->
<template>
	<div id="sowing">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="sowing in sowing_list" :key="sowing.cid">
				<img :src="sowing.icon_url" alt="" style="height:14rem">
			</van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	export default {
		name: "",	
		props: {
			sowing_list: Array,
		},
	};
</script>

<style scoped>
	#sowing {
		width: 100%;
	}
	.my-swipe {
		width: 100%;
	}
</style>
