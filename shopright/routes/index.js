/*
 * @Author: your name
 * @Date: 2020-12-14 15:46:00
 * @LastEditTime: 2021-01-30 12:29:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\routes\index.js
 */
import express from "express";
const router = express.Router({});

//引入商品的模型
import GOODS from "./../modules/goods";

import IDEA from "./../modules/Idea";

/* 根据用户的手机号请求用户的数据信息 */
router.get("/web/api/requestUser", (req, res, next) => {
  GOODS.find({ userInfo: req.query.userInfo }, (err, products) => {
    if (products.length !== 0) {
      res.json({
        status: 200,
        result: {
          data: products,
          message: "数据请求成功！",
        },
      });
    } else {
      return;
    }
  });
});




module.exports = router;
