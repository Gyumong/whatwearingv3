/** @format */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/image", function (req, res) {
  // 가져온 이미지를 저장을 해준다.

  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

var upload = multer({ storage: storage }).single("file");

router.post("/", function (req, res) {
  // 받아온 정보들을 DB에 넣어 준다.
  const product = new Product(req.body);
  product.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    } else {
      return res.status(200).json({ success: true });
    }
  });
});

router.post("/products", function (req, res) {
  // product colletion에 들어 있는 모든 상품 정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      console.log("key", key);
      findArgs[key] = req.body.filters[key];
    }
  }
  console.log(findArgs);

  Product.find(findArgs)
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, productInfo, postSize: productInfo.length });
    });
});

router.get("/product_by_id", function (req, res) {
  // productId를 이용해서 db에서 productId와 같은 상품의 정보를 가져온다
  let type = req.query.type;
  let productId = req.query.id;

  Product.find({ _id: productId })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, product });
    });
});

module.exports = router;
