const express = require('express');
const router = express.Router();

const debug = require('debug')('API:v1');

const ApiError = require('@src/core/error/api-error');

// jwt 검사 middleware
const jwt = require('express-jwt');
const jwtConfig = require('@src/config/jwt');
router.use(
  jwt({
    secret: Buffer.from(jwtConfig.secret, 'base64'),
    algorithms: [jwtConfig.algorithm],
    requestProperty: 'jwt',
  }).unless({
    path: ['/api/v1/auth/token', '/api/v1/users', '/api/v1/categories'],
  }),
);

// access, refresh token에 일치하는 path 검사후 올바른지 확인하는 middleware
router.use(function (req, res, next) {
  if ('jwt' in req) {
    if (req.path === '/auth/token/refresh') {
      if (req.jwt.type !== 'refresh') {
        return next(new ApiError('JWT_TOKEN_INVALID', 'refresh token이 아닙니다.', 401));
      }
    } else if (req.jwt.type !== 'access') {
      return next(new ApiError('JWT_TOKEN_INVALID', 'access token이 아닙니다.', 401));
    }
  }

  return next();
});

// jwt 인증 middleware에서 발생한 에러를 처리하는 handler
router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    if (err.inner?.name === 'TokenExpiredError') {
      return res.status(401).json({
        errorCode: 'JWT_TOKEN_EXPIRED',
        errorMessage: 'jwt 토큰이 만료됐습니다.',
      });
    } else if (err.inner?.name === 'JsonWebTokenError') {
      return res.status(401).json({
        errorCode: 'JWT_TOKEN_INVALID',
        errorMessage: 'jwt 토큰이 올바르지 않습니다.',
      });
    }

    return res.status(401).json({
      errorCode: 'NO_JWT_TOKEN',
      errorMessage: 'jwt 토큰이 없습니다.',
    });
  }

  next(err);
});

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

// not found
router.use(function (req, res, next) {
  debug('%s 해당하는 api는 없습니다.', req.path);
  res.status(404);
  res.json({
    errorCode: 'API_NOT_FOUND',
    errorMessage: '일치하는 API를 찾을 수 없습니다.',
  });
});

// controller(router), service에서 발생한 ApiError를 처리하는 handler
router.use(function (err, req, res, next) {
  if (err instanceof ApiError) {
    debug('ApiError 발생: %O', err);

    const responseBody = {
      errorCode: err.errorCode,
      errorMessage: err.message,
    };
    if (err.details) {
      responseBody.errorDetails = err.details;
    }

    return res.status(err.status).json(responseBody);
  }
  return next(err);
});

// 500
router.use(function (err, req, res, next) {
  debug('처리 되지 않은 에러: %O', err);
  return res.status(500).json({
    errorCode: 'INTERNAL_SERVER_ERROR',
    errorMessage: '서버에서 알 수 없는 에러가 발생했습니다.',
  });
});

module.exports = router;
