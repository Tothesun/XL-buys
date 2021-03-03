<!--
 * @Author: your name
 * @Date: 2020-10-14 17:55:25
 * @LastEditTime: 2020-10-24 13:56:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \06-vue基础+项目实战\shopleft\src\views\category\Category.vue
-->
<template>
	<div id="category">
		<Header />
		<CateContent :category_list="category_list" :category_detail="category_detail"/>
	</div>
</template>

<script>
	import Header from "./components/head/Header";
	import CateContent from "./components/catecontent/CateContent";

	//引入数据请求接口
	import {getCategoryData,getCategoryDetail} from "./../../service/index"

	//引入消息订阅插件
	import PubSub from "pubsub-js"

	export default {
		name: "",
		data(){
			return {
				//1.左边数据
				category_list:[],
				//2.右边数据
				category_detail:[],
			}
		},
		components: {
			Header,
			CateContent,
		},
		created(){
			//请求左边的分类数据
			this.requestCateData();
			//请求右边的数据
			this.requestCategoryDetail(1);
			//分类数据请求监听
			this.requestCateDetail();	
		},
		methods:{

			//请求右边详细数据
			async requestCategoryDetail(num){
				let response = await getCategoryDetail(1);
				if(response.success){
					this.category_detail = response.data.cate;
				}
			},

			//1.请求数据
			async requestCateData(){
				//请求左边分类数据
				let result = await getCategoryData();
				if(result.success){
					this.category_list = result.data.cate;
				}	
			},		

			//2.订阅消息，请求数据
			requestCateDetail(){
				PubSub.subscribe("requestCate",async (msg,num)=>{
					if(msg === "requestCate"){
						let response = await getCategoryDetail(num % 6 + 1);
						if(response.success){
							this.category_detail = response.data.cate;
						}
					}
				})
			}
		}
	};
</script>

<style scoped>
	#category {
		width: 100%;
		height: 100%;
	}
</style>
