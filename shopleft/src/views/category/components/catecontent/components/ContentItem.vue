<!--
 * @Author: your name
 * @Date: 2020-10-24 12:10:20
 * @LastEditTime: 2021-01-16 21:05:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\category\components\catecontent\components\ContentItem.vue
-->
<template>
	<div id="categoryItem" >
		<img :src="product.small_image" alt="" />
		<div id="itemDetail">
			<p>{{product.name}}</p>
			<p>{{product.spec}}</p>
			<span class="currentPrice">￥{{product.price | moneyFormat}}</span>
			<span class="originPrice">￥{{product.origin_price | moneyFormat}}</span>
			<div id="itemSvg" @click="addToCart(product)">
				<svg
					t="1603335466747"
					class="icon"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="3790"
					width="30"
					height="30"
				>
					<path
						d="M512 0C229.286957 0 0 229.286957 0 512s229.286957 512 512 512 512-229.286957 512-512S794.713043 0 512 0z m-124.66087 816.973913c-22.26087 0-40.069565-17.808696-40.069565-40.069565s17.808696-40.069565 40.069565-40.069565 40.069565 17.808696 40.069566 40.069565-17.808696 40.069565-40.069566 40.069565z m276.034783 0c-22.26087 0-40.069565-17.808696-40.069565-40.069565s17.808696-40.069565 40.069565-40.069565 40.069565 17.808696 40.069565 40.069565-17.808696 40.069565-40.069565 40.069565z m37.843478-95.721739H382.886957c-28.93913 0-53.426087-20.034783-57.878261-48.973913l-55.652174-349.495652c0-6.678261-6.678261-11.130435-13.356522-11.130435l-31.165217-2.226087c-13.356522 0-22.26087-11.130435-20.034783-24.486957 0-13.356522 11.130435-22.26087 24.486957-20.034782l31.165217 2.226087c26.713043 2.226087 48.973913 22.26087 53.426087 48.973913l55.652174 349.495652c0 6.678261 6.678261 11.130435 13.356522 11.130435h316.104347c13.356522 0 22.26087 8.904348 22.26087 22.260869s-8.904348 22.26087-20.034783 22.26087z m82.365218-349.495652l-40.069566 195.895652c-6.678261 33.391304-35.617391 60.104348-71.234782 62.330435l-267.130435 15.582608h-2.226087c-11.130435 0-22.26087-8.904348-22.260869-20.034782 0-13.356522 8.904348-22.26087 20.034782-24.486957l269.356522-15.582608c15.582609 0 26.713043-11.130435 28.93913-24.486957l37.843479-191.443478H369.530435c-13.356522 0-22.26087-8.904348-22.26087-22.26087s8.904348-22.26087 22.26087-22.260869h376.208695c22.26087 0 40.069565 17.808696 40.069566 40.069565-2.226087 2.226087-2.226087 4.452174-2.226087 6.678261z"
						p-id="3791"
						fill="#d81e06"
					></path>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>

	import {mapMutations,mapState} from "vuex"

	import {Toast} from "vant"

	//3.服务器接口引入
	import {addGoodsToCart} from "./../../../../../service/index"

	export default {
		name: "",
		props:{
			product: Object
		},
		computed:{
			...mapState(["userInfo"])
		},
		methods:{
			...mapMutations(["ADD_GOODS"]),

			//1.商品加入购物车
			async addToCart(product){

				//1.1判断用户是否登录
				if(this.userInfo === null){ //未登录状态
					this.$router.push("/login");
				}else{  //登录状态
					this.ADD_GOODS({
						goodsId: product.id, 
						goodsName: product.name, 
						goodsImg: product.small_image, 
						goodsPrice: product.price
					})

					//服务器进行同步提交
					let result = await addGoodsToCart(this.userInfo,product.id,product.small_image,product.name,1,product.price,true);

					//2.提示加入购物车成功
					Toast({
						message: '成功加入购物车！',
 						duration: 500
					})
				}
				
			}

		}
	};
</script>

<style scoped>
	#categoryItem {
		width: 100%;
		height: 7rem;
		position: relative;
		background-color:white;
		border-bottom:1px solid #E0E0E0;
	}
	#categoryItem img {
		width: 4.5rem;
		position: absolute;
		top: 1rem;
	}
	#itemDetail {
		display: inline-block;
		position: absolute;
		left: 5.3rem;
		width: 65%;
		height: 100%;
		padding-top: 1rem;
		box-sizing: border-box;
	}
	#itemDetail p:nth-child(2) {
		margin-bottom: 0.4rem;
		font-size: 0.8rem;
		color: #999;
	}
	#itemDetail .currentPrice {
		position: absolute;
		bottom: 0.2rem;
		left: 0.2rem;
		font-size: 0.88rem;
		color: red;
	}

	#itemDetail .originPrice {
		position: absolute;
		bottom: 0.2rem;
		left: 3.6rem;
		font-size: 0.83rem;
		text-decoration: line-through;
		color: #B2B2B2;
	}
	#itemDetail #itemSvg {
		position: absolute;
		bottom: 0;
		right: 0.4rem;
	}
</style>
