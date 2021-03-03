<!--
 * @Author: your name
 * @Date: 2020-10-14 17:55:31
 * @LastEditTime: 2021-02-01 17:14:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\home\Home.vue
-->
<template>
	<div id="home">	
		
		<div class="wrapper" ref="myScroll">
			<Header />
			<Sowing :sowing_list="sowing_list" />
			<Cate :categogy_list="categogy_list"/>
			<FlashSale :flash_list="flash_list"/>
			<YouLike :youlike_list="youlike_list"/>
			<TopButton v-show="showBtnToTop" @click.native="scrollBack()"/>
		</div>
		
	
	
	</div>
</template>

<script>
	//1.引入组件
	import Header from "./components/header";
	import Sowing from "./components/Sowing";
	import Cate from "./components/Cate";
	import FlashSale from "./components/FlashSale";
	import YouLike from "./components/YouLike";
	import TopButton from "./components/TopButton";

	//2.引入数据请求接口
	import {getHomeData} from "./../../service/index"

	//3.引入缓动动画处理函数
	import {animate} from "./../../config/global"

	export default {
		name: "",
		data(){
			return{
				//1.首页轮播数据
				sowing_list:[],
				//2.分类数据
				categogy_list:[],
				//3.限时抢购数据
				flash_list:[],
				//4.猜你喜欢数据
				youlike_list:[],

				//5.滚回顶部按钮是否显示
				showBtnToTop: false,

			}
		},
		
		components: {
			Header,
			Sowing,
			Cate,
			FlashSale,
			YouLike,
			TopButton,
		},

		created(){
			this.getData();
			this.showBack();
		},
		methods:{
			//请求数据
			async getData(){
				//1.请求数据
				let result = await getHomeData();
				console.log(result);

				//2.数据渲染
				this.sowing_list = result.data.list[0].icon_list;
				this.categogy_list = result.data.list[2].icon_list;
				this.flash_list = result.data.list[3].product_list;
				this.youlike_list = result.data.list[12].product_list;

				
				

			},
			showBack(){
				let docB = document.documentElement || document.body;

				//1.监听滚动
				document.addEventListener("scroll",()=>{
					this.showBackFuction(docB);
				});

				//2.监听触摸
				document.addEventListener("touchstart",()=>{
					this.showBackFuction(docB);
				});

				//3.监听触摸移动
				document.addEventListener("touchmove",()=>{
					this.showBackFuction(docB);
				});

				//4.监听触摸结束
				document.addEventListener("touchend",()=>{
					this.showBackFuction(docB);
				});
			},
			showBackFuction(docB){
				if(docB.scrollTop >= 300){
					this.showBtnToTop = true;
				}else{
					this.showBtnToTop = false;
				}
			},
			scrollBack(){
				animate(0);
			}
		},
	};
</script>

<style scoped>
	#home {
		width: 100%;
		height: 1000px;
	}
</style>
