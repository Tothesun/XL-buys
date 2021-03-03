/*
 * @Author: your name
 * @Date: 2020-11-10 15:25:02
 * @LastEditTime: 2021-03-03 10:52:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopleft\src\service\index.js
 */
import jqueryRequest from "./jqueryRequest";

//定义全局地址
let LOCLAL_URL = "http://localhost:3000/web/api";

//首页数据请求
//1.首页数据请求接口
export const getHomeData = () => jqueryRequest(LOCLAL_URL + "/homeApi");

//分类数据请求
//2.分类左边数据请求接口
export const getCategoryData = () => jqueryRequest(LOCLAL_URL + "/categoryApi");
//3.分类右边详细的数据接口
export const getCategoryDetail = (num) =>
  jqueryRequest(LOCLAL_URL + "/categorisDetail/00" + num);

//登录数据请求
//1.请求验证码
export const getPhoneCode = (phone) =>
  jqueryRequest(LOCLAL_URL + "/send_code", { phone });
//2.登录
export const codeLogin = (phone, code) =>
  jqueryRequest(LOCLAL_URL + "/login_code", { phone, code }, "post");
//3.请求用户数据
export const requestUserData = (userInfo) =>
  jqueryRequest(LOCLAL_URL + "/requestUser", { userInfo });

//商品处理
//1.商品加入购物车
export const addGoodsToCart = (
  userInfo,
  id,
  image,
  name,
  num,
  price,
  checked
) =>
  jqueryRequest(
    LOCLAL_URL + "/addToCart",
    { userInfo, id, image, name, num, price, checked },
    "post"
  );
//2. 单个商品的选中和取消选中
export const singleChoose = (userInfo, id, checked) =>
  jqueryRequest(
    LOCLAL_URL + "/goods/singleChoose",
    { userInfo, id, checked },
    "post"
  );
// 3. 单个商品的增加和减少
export const singleAddOrReduce = (userInfo, id, flag) =>
  jqueryRequest(
    LOCLAL_URL + "/goods/singleAddOrReduce",
    { userInfo, id, flag },
    "post"
  );
// 4. 清空购物车
export const clearShopCart = (userInfo) =>
  jqueryRequest(LOCLAL_URL + "/goods/clearCart", { userInfo }, "post");

//用户地址处理
//1.添加用户地址
export const addUserAddress = (
  userInfo,
  addressName,
  tel,
  province,
  city,
  county,
  areaCode,
  addressDetail,
  postalCode,
  isDefault
) =>
  jqueryRequest(
    LOCLAL_URL + "/address/addMyAddress",
    {
      userInfo,
      addressName,
      tel,
      province,
      city,
      county,
      areaCode,
      addressDetail,
      postalCode,
      isDefault,
    },
    "post"
  );

  //2.请求用户所有地址
  export const requestAddress = (userInfo)=>jqueryRequest(LOCLAL_URL + "/address/reqAddressData",{userInfo},"post");

  //3.根据id请求用户的一个地址
  export const requestOneAddress = (address_id) => jqueryRequest(LOCLAL_URL + "/address/requestOneAdress",{address_id},"post");

  //4.编辑用户地址
  export const editAddress = (address_id,phone,addressName,tel,province,city,county,areaCode,addressDetail,postalCode,isDefault) => jqueryRequest(LOCLAL_URL + "/address/editAddress",{address_id,phone,addressName,tel,province,city,county,areaCode,addressDetail,postalCode,isDefault},"post");

  //5.删除用户地址
  export const deleteAddress = (address_id) => jqueryRequest(LOCLAL_URL + "/address/deleteAddress",{address_id},"post");

  //用户意见提交
  export const submmitIdea = (phone,content)=>jqueryRequest(LOCLAL_URL + "/mine/idea",{phone,content},"post");


  //优惠券相关
  //1.添加优惠券
  export const addCupon = (phone,code)=>jqueryRequest(LOCLAL_URL + "/mine/addCupon",{phone,code},"post");
  //2.请求所有的优惠券
  export const reqAllCupon = (phone)=>jqueryRequest(LOCLAL_URL + "/mine/getAllCupon",{phone},"post");
 

  //订单相关
  //1.生成订单
  export const submitOrder = (phone,title,product,allPrice,discounts,lastPrice,lastText)=>jqueryRequest(LOCLAL_URL + "/submitOrder",{phone,title,product,allPrice,discounts,lastPrice,lastText},"post");
  //2.请求订单
  export const requestOrderData = (phone)=>jqueryRequest(LOCLAL_URL + "/requestOrderData",{phone},"post");
 