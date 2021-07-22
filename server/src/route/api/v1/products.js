const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');

const wrapAsync = require('@src/middleware/wrap-async');
const invalidRequest = require('@src/middleware/invalid-request');

const Product = require('@src/model/product');
const productService = require('@src/service/product');

// 상품 목록 불러오기
router.get(
  '/',
  invalidRequest(
    query('location').trim().isLength({ max: 10 }).notEmpty(),
    query('category').trim().isLength({ max: 30 }),
  ),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const { location, category } = req.query;
    const products = await productService.searchProductsAsync(userId, location, category);

    return res.status(200).json(products);
  }),
);

// 상품 등록하기
router.post(
  '/',
  invalidRequest(
    body('images').isArray().isURL().notEmpty(),
    body('title').trim().isLength({ max: 100 }).notEmpty(),
    body('price').isNumeric(),
    body('category').trim().isLength({ max: 30 }).notEmpty(),
    body('content').trim(),
    body('location').trim().isLength({ max: 10 }).notEmpty(),
  ),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const newProductId = await productService.addProductAsync(userId, req.body);

    return res.status(201).header('location', `/api/v1/product/${newProductId}`).end();
  }),
);

// 상품의 상세 정보를 불러온다.
router.get(
  '/:id',
  invalidRequest(param('id').isNumeric()),
  wrapAsync(async function (req, res) {
    const productId = +req.params.id;
    const productDetail = await productService.getProductDetailAsync(productId);
    return res.status(200).json(productDetail);
  }),
);

// 상품 정보 수정하기
router.put(
  '/:id',
  invalidRequest(
    param('id').isNumeric(),
    body('images').isArray().isURL().notEmpty(),
    body('title').trim().isLength({ max: 100 }).notEmpty(),
    body('price').isNumeric(),
    body('category').trim().isLength({ max: 30 }).notEmpty(),
    body('content').trim(),
    body('location').trim().isLength({ max: 10 }).notEmpty(),
  ),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const productId = +req.params.id;
    await productService.updateProductAsync(userId, productId, req.body);

    return res.status(201).end();
  }),
);

// 상품 정보 삭제하기
router.delete(
  '/:id',
  invalidRequest(param('id').isNumeric()),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const productId = +req.params.id;
    await productService.deleteProductAsync(userId, productId);

    return res.status(201).end();
  }),
);

// 현재 상품의 부분 업데이트 정보 획득
router.get(
  '/:id/refresh',
  invalidRequest(param('id').isNumeric()),
  wrapAsync(async function (req, res) {
    const productId = +req.params.id;
    const productRefresh = await productService.getProductRefreshAsync(productId);

    return res.status(200).json(productRefresh);
  }),
);

// 삼품 현재 상태 변경하기
router.put(
  '/:id/status',
  invalidRequest(
    param('id').isNumeric(),
    body('status')
      .isIn([Product.status.SALE, Product.status.RESERVED, Product.status.SOLDOUT])
      .notEmpty(),
  ),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const productId = +req.params.id;
    const { status } = req.body;

    await productService.updateProductStatusAsync(userId, productId, status);

    return res.status(201).end();
  }),
);

// 상품 관심목록에 등록
router.post(
  '/:id/watch',
  invalidRequest(param('id').isNumeric()),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const productId = +req.params.id;

    await productService.addWatchToProductAsync(userId, productId);

    return res.status(201).end();
  }),
);

// 상품 관심목록에서 제거
router.delete(
  '/:id/watch',
  invalidRequest(param('id').isNumeric()),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const productId = +req.params.id;

    await productService.removeWatchFromProductAsync(userId, productId);

    return res.status(201).end();
  }),
);

// 상품과 관련된 채팅창 목록을 가지고 온다.
router.get('/:id/chats', function (req, res) {
  res.send('GET /api/v1/products/{id}/chats');
});

// 상품에 채팅창을 처음 만든다.
router.post('/:id/chats', function (req, res) {
  res.send('POST /api/v1/products/{id}/chats');
});

module.exports = router;
