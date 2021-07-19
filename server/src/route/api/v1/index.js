const express = require('express');
const router = express.Router();

const debug = require('debug')('API:v1');

// https://app.swaggerhub.com/apis/TsooranKim/WoowaMarket/1.0.0

const authRouter = require('./auth');
const usersRouter = require('./users');
const imagesRouter = require('./images');
const categoriesRouter = require('./categories');
const productsRouter = require('./products');
const chatsRouter = require('./chats');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);
router.use('/categories', categoriesRouter);
router.use('/products', productsRouter);
router.use('/chats', chatsRouter);

router.use(function (req, res, next) {
  debug('%s 해당하는 api는 없습니다.', req.path);
  res.status(404);
  res.json({
    errorCode: 'API_NOT_FOUND',
    errorMessage: '일치하는 API를 찾을 수 없습니다.',
  });
});

router.use(function (err, req, res, next) {
  debug('처리 되지 않은 에러: %O', err);
  res.status(500);
  res.json({
    errorCode: 'INTERNAL_SERVER_ERROR',
    errorMessage: '서버에서 알 수 없는 에러가 발생했습니다.',
  });
});

module.exports = router;
