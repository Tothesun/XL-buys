<!--
 * @Author: your name
 * @Date: 2020-10-27 17:09:26
 * @LastEditTime: 2021-03-03 13:19:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\views\cart\components\cartcontent\components\ContentItem.vue
-->
<template>
	<div id="contentItem">
		<input type="checkbox" id="chooseBox" :checked="product.checked" @click="sigleChecked(product)"/>
		<div id="productImg">
			<img :src="product.image" alt="" />
		</div>
		<div id="itemDetail">
			<p>{{product.name}}</p>
		
				<span>¥{{product.price | moneyFormat}}</span>
				<div id="itemCount">
					<span @click="reduceGoods(product)">-</span>
					<input type="number" disabled :value="product.num" style="width:1.4rem;text-align:center"/>
					<span @click="addGodds(product)">+</span>
				</div>
			
		</div>
	</div>
</template>

<script>
import {mapMutations} from "vuex";
import { Dialog, Toast } from 'vant';

import {singleChoose, singleAddOrReduce} from "./../../../../../service/index"
import { getItem } from '../../../../../config/global';
	export default {
		name: "",
		props:{
			product:Object
		},
		methods:{
			...mapMutations(["SINGLE_SELECTE","ADD_GOODS","SINGLE_REDUCE"]),
			//单个商品的选中和取消选中
			async sigleChecked(product){
				this.SINGLE_SELECTE({
					goodsId:product.id,
					flag: !product.checked,
				})
				//和服务器同步  
				let result = await singleChoose(getItem("userInfo"),product.id,product.checked);
				
			},
			//单个商品的增加
			async addGodds(product){
				//vux中添加
				this.ADD_GOODS({
					goodsId: product.id, 
					goodsName: product.name, 
					goodsImg: product.image, 
					goodsPrice: product.price
				})

				//商品和服务器的数量进行同步(商品数量增加)
				let result = await singleAddOrReduce(getItem("userInfo"),product.id,1)	
			},

			//单个商品的减少
			async reduceGoods(product){
				if(product.num === 1){
					Dialog.confirm({
				    title: '温馨提示',
				    message: "再减就要删除啦！",
				  })
				    .then(async () => {
					    // on confirm
						this.SINGLE_REDUCE({
							goodsId:product.id
						})

						//和服务器同步数据（商品数量减少）
						let result = await singleAddOrReduce(getItem("userInfo"),product.id,0);
				    })
				    .catch(() => {
					    // on cancel
						return;
				    });
				}else{
					this.SINGLE_REDUCE({
						goodsId:product.id
					})

					//和服务器同步数据（商品数量减少）
					let result = await singleAddOrReduce(getItem("userInfo"),product.id,0)
				}
				
			}
		}
	};
</script>

<style scoped>
	#contentItem {
		width: 100%;
		height: 6rem;
		background-color: white;
		position: relative;
		border-bottom: 1px solid #efefef;
	}
	#contentItem #chooseBox {
		position: absolute;
		left: 0.5rem;
		top: 47%;
	}
	#contentItem #productImg {
		width: 4rem;
		height: 4rem;
		position: absolute;
		left: 1.8rem;
		top: 1rem;
	}
	#contentItem #productImg img {
		height: 4rem;
	}

	#itemDetail {
		position: relative;
		left: 7.5rem;
		top:1rem;
		width: 13rem;
		height: 5rem;	
	}

	#itemDetail > span {
		font-size: 0.85rem;
		position:absolute;
		left:0.2rem;
		bottom: 0.5rem;

	}
	#itemDetail #itemCount {
		position: absolute;
		right: 0;
		bottom: 0.5rem;
		
	}
	#itemDetail  #itemCount input {
		width: 0.7rem;
		height: 0.7rem;
		margin: 0 0.5rem;
		border: none;
		background-color: #f5f5f5;
		padding: 0.2rem;
	}
</style>
