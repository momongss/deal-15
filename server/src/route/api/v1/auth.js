const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const ApiError = require('@src/core/error/api-error');

const userDao = require('@src/dao/user');
const jwtService = require('@src/service/jwt');

// 로그인 후 토큰을 반환 받습니다.
router.post('/token', body('username').trim().notEmpty(), function (req, res) {
  // request body validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 만약 request가 올바르지 않으면 에러
    throw new ApiError('INVALID_REQUEST', '입력값이 올바르지 않습니다.', 400, errors.array());
  }

  // 안티패턴 -  service layer에서 transaction 처리를 해줘야 하기에 dao를 직접 접근하면 안되나 생략
  // 해당 유저 검색
  const foundUser = userDao.findByUsername(req.body.username);

  // 검색된 유저가 없으면 에러
  if (foundUser === null) {
    throw new ApiError('NON_EXISTENT_USER', '일치하는 유저가 없습니다.', 404);
  }

  // 검색된 유저를 기준으로 jwt 토큰 생성
  const tokens = jwtService.issueNewToken(foundUser);
  return res.status(200).json(tokens);
});

// 만료된 jwt를 refresh token을 사용해서 갱신합니다.
router.post('/token/refresh', function (req, res) {
  const refreshTokenId = req.jwt.tokenId;
  // refresh token에 있는 tokenId를 가지고 토큰 갱신
  const tokens = jwtService.refreshToken(refreshTokenId);

  return res.status(200).json(tokens);
});

// 현재 활성화된 token을 refresh token으로 비활성화(로그아웃) 합니다.
router.delete('/token/refresh', function (req, res) {
  const refreshTokenId = req.jwt.tokenId;
  // refresh token에 있는 tokenId를 가지고 토큰 제거
  jwtService.removeRefreshToken(refreshTokenId);

  return res.status(201).end();
});

module.exports = router;
