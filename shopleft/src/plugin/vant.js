/*
 * @Author: your name
 * @Date: 2020-10-15 19:20:50
 * @LastEditTime: 2021-01-29 19:26:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\06-vue基础+项目实战\shopleft\src\plugin\vant.js
 */
import Vue from "vue"

//1.引入导航栏
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

//2.轮播图插件
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);

//3.引入标题栏
import { NavBar } from 'vant';
Vue.use(NavBar);

//4.引入单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

//5.引入宫格
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);

//6.引入轻提示
import { Toast } from 'vant';
Vue.use(Toast);

//7.引入遮罩层
import { Dialog } from 'vant';
Vue.use(Dialog);

//8. 引入添加联系人
import { ContactCard } from 'vant';
Vue.use(ContactCard);

//9.提交订单栏
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);

//10.引入商品卡片
import { Card } from 'vant';
Vue.use(Card);

//11.引入标签栏
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);

//12.地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);

//13.地址编辑
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);

//14.地址选择
import { Area } from 'vant';
Vue.use(Area);

//15.弹出层
import { Popup } from 'vant';
Vue.use(Popup);

//16.空状态
import { Empty } from 'vant';
Vue.use(Empty);

//17.按钮
import { Button } from 'vant';
Vue.use(Button);

//18.遮罩层
import { Overlay } from 'vant';
Vue.use(Overlay);

//19.优惠券
import { CouponCell, CouponList } from 'vant';
Vue.use(CouponCell).use(CouponList);