<template>
	<div id="youLike">
		<div id="youLikeHeader">
			<span class="line">——————</span>
			<span>猜你喜欢</span>
			<span class="line">——————</span>
		</div>
		<div id="youLikeContent">
			<YouLikeDetail v-for="likeItem in youlike_list" :key="likeItem.cid" :likeItem="likeItem"/>
		</div>
	</div>
</template>

<script>
	import YouLikeDetail from "./components/YouLikeDetail";
	export default {
		name: "",
		props:{
			youlike_list:Array
		},
		components: {
			YouLikeDetail,
		},
	};
</script>

<style scoped>
	#youLike {
		width: 100%;
		position: relative;
		margin-bottom: 3rem;
        overflow: hidden;
	}
	#youLikeHeader {
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		text-align: center;
	}
	#youLikeHeader span:nth-child(2) {
		margin: 0 1rem;
	}
	#youLikeHeader .line {
		color: #e4e4e4;
	}
</style>
