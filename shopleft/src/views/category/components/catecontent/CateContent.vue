<!--
 * @Author: your name
 * @Date: 2020-10-23 17:00:20
 * @LastEditTime: 2020-10-24 15:13:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\category\components\catecontent\CateContent.vue
-->
<template>
	<div id="cateContent">
		<div id="contentLeft">
			<ul>
				<li v-for="(cate, index) in category_list" :key="cate.id" ref="allLis" :class="{current: startIndex === index}" @click="changeCurrent(index)"><span></span>{{cate.name}}</li>
			</ul>
		</div>
		<div id="contentRight">
			<div id="contentBox" v-for="box in category_detail" :key="box.id">
				<p>{{box.name}}</p>
				<div id="content">
					<ContentItem v-for="product in box.products" :key="product.id" :product="product"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ContentItem from "./components/ContentItem";
	//引入消息通知组件
	import PubSub from "pubsub-js"


	export default {
		name: "",
		data(){
			return{
				startIndex:0,
			}	
		},
		props:{
			category_list: Array,
			category_detail: Array,
		},
		components: {
			ContentItem,
		},
		// mounted(){
		// 	this.$refs.allLis[0].className = "current";
		// },
		methods:{
			changeCurrent(num){
				//发布请求数据的消息
				PubSub.publish("requestCate",num);

				//改变分类样式
				let Lis = this.$refs.allLis;
				for(let i = 0; i < Lis.length; i++){
					Lis[i].className = " ";	
				}
				this.$refs.allLis[num].className = "current";
			}
		}
	};
</script>

<style lang="less" scoped>
	#cateContent {
		margin-top: 2.8rem;
		width: 100%;
		height: 85%;
		margin-bottom: 3rem;
		overflow: hidden;
		position: fixed;
	}

	/* 左边分类 */
	#contentLeft {
		width: 25%;
		height: 100%;
		float: left;
		overflow: auto;
	}
	#contentLeft::-webkit-scrollbar {
		display: none;
	}
	#contentLeft li {
		width: 100%;
		height: 2.7rem;
		line-height: 2.7rem;
		text-align: center;
		border-bottom: 1px solid #ececec;
		font-size: 0.85rem;
		color: #666;
		position: relative;
	}
	#contentLeft li span {
		display: inline-block;
		width: 0.15rem;
		height: 1.7rem;
		background-color: red;
		position: absolute;
		left: 0;
		top: 0.5rem;
		display: none;
	}
	#contentLeft .current {
		background-color: white;
		font-weight: bold;
		color: black;
		span {
			display: inline-block;
		}
	}

	/* 右边的内容 */
	#contentRight {
		width: 75%;
		height: 100%;
		float: left;
		overflow: auto;
	}
	#contentBox p {
		font-size: 0.76rem;
		margin: 0.3rem;
		color: #666;
	}
</style>
