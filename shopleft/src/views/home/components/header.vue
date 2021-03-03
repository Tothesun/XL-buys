<!--
 * @Author: your name
 * @Date: 2020-10-18 10:28:56
 * @LastEditTime: 2020-10-22 10:08:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\home\components\header.vue
-->
<template>
	<div id="header">
		<div id="headerLeft">
			<svg
				t="1603280052471"
				class="icon"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="2773"
				width="20"
				height="20"
			>
				<path
					d="M509.59293868 47.96723843c-193.90031738 0-351.54152078 154.91972377-351.5415217 345.36192037 0 149.37445343 216.49064576 439.65198633 309.65528817 562.1390375a52.79261484 52.79261484 0 0 0 41.88623353 20.56456527c16.43118982 0 32.1666631-7.65288268 41.98854461-20.56456527 93.08279319-122.4665893 309.69621188-412.76458498 309.69621187-562.1390375C861.27769516 202.8869622 703.51371791 47.96723843 509.59293868 47.96723843z m0 470.89784805c-82.83120379 0-150.25433023-66.07261801-150.25433024-147.43053955 0-81.31699691 67.42312644-147.49192598 150.25433024-147.49192506 82.87212839 0 150.19294287 66.17492907 150.19294287 147.49192506 0 81.35792152-67.32081538 147.43053862-150.19294287 147.43053955z"
					fill="#646566"
					p-id="2774"
				></path>
			</svg>
			<span>请稍等……</span>
			<svg
				t="1603280190575"
				class="icon"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="3663"
				width="20"
				height="20"
			>
				<path
					d="M511.872 676.8c-0.003 0-0.006 0-0.008 0-9.137 0-17.37900001-3.829-23.20999999-9.97l-251.27700001-265.614c-5.415-5.72-8.743-13.464-8.744-21.984 0-17.678 14.33-32.008 32.008-32.008 9.15700001 0 17.416 3.84499999 23.25 10.00900001l228.04500001 241.10299999 228.22399999-241.088c5.855-6.165 14.113-10.001 23.266-10.001 8.516 0 16.256 3.32 21.998 8.736 12.784 12.145 13.36 32.434 1.264 45.233l-251.52 265.6c-5.844 6.155-14.086 9.984-23.223 9.984-0.025 0-0.05100001 0-0.076 0z"
					p-id="3664"
					fill="#646566"
				></path>
			</svg>
		</div>
		<div id="headerRight">
			<div id="headerRightInner">
				<svg
					t="1603280786650"
					class="icon"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="4450"
					width="18"
					height="18"
				>
					<path
						d="M752.658944 701.658283c7.420821 1.705936 14.500456 5.544292 20.215342 11.344474l241.219344 241.219345a42.648399 42.648399 0 0 1-60.304836 60.304836L712.569449 773.307593a42.477805 42.477805 0 0 1-11.344474-20.215341 426.483989 426.483989 0 1 1 51.433969-51.433969zM426.483989 768.104489a341.187191 341.187191 0 1 0 0-682.374383 341.187191 341.187191 0 0 0 0 682.374383z"
						p-id="4451"
						fill="#646566"
					></path>
				</svg>
				<input type="text" placeholder="请输入商品名称" />
			</div>
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
		height: 3rem;
		line-height: 3rem;
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
	}
	#headerLeft {
		margin: 0 0.5rem;
		width: 8rem;
		float: left;
	}
	#headerLeft span {
		margin: 0 0.3rem;
		font-size: 0.9rem;
	}

	/* 右边的搜索框 */
	#headerRight {
		float: left;
		width: 12rem;
		height: 2rem;
		margin-top: 0.5rem;
		border-radius: 1rem;
		background-color: #f5f5f5;
	}
	#headerRightInner {
		margin-left: 2rem;
		height: 2rem;
		line-height: 2rem;
	}
	#headerRightInner input {
		width: 6rem;
		height: 1.8rem;
		border: none;
		font-size: 0.8rem;
		background-color: #f5f5f5;
		margin-left: 0.2rem;
	}
</style>
