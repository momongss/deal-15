const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const wrapAsync = require('@src/middleware/wrap-async');
const invalidRequest = require('@src/middleware/invalid-request');

const Category = require('@root/src/model/category');
const categoryService = require('@src/service/category');

// 삼품 카테고리 목록을 불러온다
router.get(
  '/',
  wrapAsync(async function (req, res) {
    const categories = await categoryService.getAllAsync();
    return res.status(200).json(categories);
  }),
);

// 새로운 카테고리 등록
router.post(
  '/',
  invalidRequest(
    body('title').trim().isLength({ max: 30 }).notEmpty(),
    body('image').trim().notEmpty(),
  ),
  wrapAsync(async function (req, res) {
    const { title, image } = req.body;
    const category = new Category(null, title, image);
    await categoryService.addCategoryAsync(category);

    return res.status(200).json(category);
  }),
);

module.exports = router;
