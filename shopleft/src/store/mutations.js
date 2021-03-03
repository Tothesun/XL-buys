/*
 * @Author: your name
 * @Date: 2020-11-16 15:22:32
 * @LastEditTime: 2021-01-17 14:35:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\store\mutations.js
 */
import { ADD_GOODS,ADD_USERINFO,ADD_SHOPCART,CLEAR_SHOPCAT,SINGLE_SELECTE,ALL_SELECTE } from "./mutation-type"

export default {

    //商品加入购物车
    [ADD_GOODS](state, { goodsId, goodsName, goodsImg, goodsPrice }) {
        //1.先在sotre里头获取数据
        let shopCart = state.shopCart;

        //2.判断商品是否存在
        if(shopCart[goodsId]){
            shopCart[goodsId]["num"]++;
        }else {
            shopCart[goodsId]= {
                id:goodsId,
                name: goodsName,
                image: goodsImg,
                price: goodsPrice,
                num: 1,
                checked:true
            }
        }
        
        //3.同步到state里头
        state.shopCart = {...shopCart};
    },
    
    /* 同步vuex的数据 */
    [ADD_USERINFO](state, {userInfo}){
        state.userInfo = userInfo;
    },

    /* 数据同步到购物车 */
    [ADD_SHOPCART](state, {products}){
        let goods = [];
        for(let i = 0; i < products.length; i++){
            goods[products[i].id] = products[i];
        }

        /* 
        
            延展符号：特别适合复制对象的数组，方便快捷
        
        */
        state.shopCart = {...goods};
    },
    
    /* 清空购物车的数据 */
    [CLEAR_SHOPCAT](state){
        state.shopCart = [];
    },

    /* 单个商品的选中和取消选中 */
    SINGLE_SELECTE(state,{goodsId,flag}){
        let shopCart = state.shopCart;
        shopCart[goodsId].checked = flag;
    },

    /* 所有商品的选中和取消选中 */
    ALL_SELECTE(state,{flag}){
        let shopCart = state.shopCart;
        for(let key in shopCart){
            let obj = shopCart[key];
            obj.checked = flag;
        }
    },

    /* 单个商品的减少 */
    SINGLE_REDUCE(state,{goodsId}){
        //获取数据
        let shopCart = state.shopCart;
        let goods = shopCart[goodsId];

        //删除数据
        if(goods){
            if(goods['num'] > 1){
                goods['num']--;
            }else{
                delete shopCart[goodsId];
            }
        }

        //同步数据
        state.shopCart = {...shopCart};

		
    }
}