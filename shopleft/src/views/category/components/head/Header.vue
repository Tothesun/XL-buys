<!--
 * @Author: your name
 * @Date: 2020-10-22 15:35:21
 * @LastEditTime: 2020-10-24 13:53:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\category\components\head\Header.vue
-->
<template>
	<div id="header">
		<div id="headerInner">
			<div class="headerSvg">
				<svg
					t="1603416889325"
					class="icon"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="3055"
					width="20"
					height="20"
				>
					<path
						d="M752.658944 701.658283c7.420821 1.705936 14.500456 5.544292 20.215342 11.344474l241.219344 241.219345a42.648399 42.648399 0 0 1-60.304836 60.304836L712.569449 773.307593a42.477805 42.477805 0 0 1-11.344474-20.215341 426.483989 426.483989 0 1 1 51.433969-51.433969zM426.483989 768.104489a341.187191 341.187191 0 1 0 0-682.374383 341.187191 341.187191 0 0 0 0 682.374383z"
						p-id="3056"
						fill="#999999"
					></path>
				</svg>
			</div>

			<input type="text" placeholder="请输入商品名称" />
		</div>
	</div>
</template>

<script>
	export default {
		name: "",
	};
</script>

<style scoped>
	#header {
		width: 100%;
		height: 2.8rem;
		line-height: 3rem;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		background-color: white;
	}
	#header #headerInner {
		width: 95%;
		height: 1.8rem;
		line-height: 1.8rem;
		background-color: #f5f5f5;
		margin: 0.5rem auto;
		border-radius: 5rem;
	}
	#header #headerInner input {
		border: none;
		width: 15rem;
		height: 1.2rem;
		background-color: #f5f5f5;
		font-size: 0.9rem;
		margin-left: 1.8rem;
	}
	#header #headerInner .headerSvg {
		display: inline-block;
		position: absolute;
		left: 1rem;
		top: 0.8rem;
	}
</style>
