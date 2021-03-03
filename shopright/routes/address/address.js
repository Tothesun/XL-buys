/*
 * @Author: your name
 * @Date: 2021-01-21 15:41:26
 * @LastEditTime: 2021-01-29 12:18:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\shopright\routes\address\address.js
 */

import express from "express";
const router = express.Router({});
import ADDRESS from "./../../modules/address";

//新增用户地址
router.post("/web/api/address/addMyAddress", (req, res, next) => {
  if (req.body) {
    var address = {};
    //1.生成数据库文件
    address = new ADDRESS({
      //用户
      phone: req.body.userInfo,
      //地址姓名
      addressName: req.body.addressName,
      //地址电话
      tel: req.body.tel,
      //省
      province: req.body.province,
      //市
      city: req.body.city,
      //区
      county: req.body.county,
      //地区码
      areaCode: req.body.areaCode,
      //详细地址
      addressDetail: req.body.addressDetail,
      //邮政编码
      postalCode: req.body.postalCode,
      //是否默认
      isDefault: Boolean(req.body.isDefault),
    });

    //2.存入数据库
    let result = address.save();
    result.then((data) => {
      if (data === address) {
        res.json({
          status: 200,
          message: "数据存入成功！",
        });
      } else {
        res.json({
          status: 1,
          message: "数据存入失败！",
        });
      }
    });
  } else {
    res.json({
      status: 1,
      message: "没有收到地址数据，请检查！",
    });
  }
});

//请求用户地址数据
router.post("/web/api/address/reqAddressData", (req, res, next) => {
  if (req.body.userInfo) {
    ADDRESS.find(
      { phone: req.body.userInfo },
      "_id phone addressName tel province city county areaCode addressDetail postalCode isDefault",
      (err, data) => {
        if (err) {
          throw err;
        }
        if (data.length > 0) {
          res.json({
            status: 200,
            result: data,
          });
        } else {
          res.json({
            status: 1,
            message: "没有从后台请求到数据！",
          });
        }
      }
    );
  }
});

//根据address的id来请求用户的地址
router.post("/web/api/address/requestOneAdress", (req, res, next) => {
  ADDRESS.findOne({ _id: req.body.address_id }, (err, data) => {
    if (err) {
      throw err;
    }
    if (data !== null) {
      res.json({
        status: 200,
        result: data,
      });
    } else {
      res.json({
        status: 1,
        message: "没有查找到地址数据！",
      });
    }
  });
});

//编辑用户地址
router.post("/web/api/address/editAddress", (req, res, next) => {
  ADDRESS.findOneAndUpdate(
    { _id: req.body.address_id },
    {
      //用户
      phone: req.body.phone,
      //地址姓名
      addressName: req.body.addressName,
      //地址电话
      tel: req.body.tel,
      //省
      province: req.body.province,
      //市
      city: req.body.city,
      //区
      county: req.body.county,
      //地区码
      areaCode: req.body.areaCode,
      //详细地址
      addressDetail: req.body.addressDetail,
      //邮政编码
      postalCode: req.body.postalCode,
      //是否默认
      isDefault: req.body.isDefault === "true" ? true : false,
    },
    { new: true, useFindAndModify: false },
    (err) => {
      
      if (err) {
        throw err;
      }
      res.json({
        status: 200,
        result: "成功修改数据！",
      });
    }
  );
});

//删除用户地址
router.post("/web/api/address/deleteAddress", (req, res, next) => {
  ADDRESS.findOneAndRemove(
    { _id: req.body.address_id },
    { useFindAndModify: false },
    (err, doc) => {
      if (err) {
        throw err;
      }
      res.json({
        status: 200,
        result: "成功删除地址！",
      });
    }
  );
});

module.exports = router;
