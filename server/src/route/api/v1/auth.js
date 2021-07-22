const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const warpAsync = require('@src/middleware/wrap-async');
const invalidRequest = require('@src/middleware/invalid-request');

const userService = require('@src/service/user');
const jwtService = require('@src/service/jwt');

// 로그인 후 토큰을 반환 받습니다.
router.post(
  '/token',
  invalidRequest(body('username').trim().notEmpty()),
  warpAsync(async function (req, res) {
    const foundUser = await userService.findByUsernameOrThorwAsync(req.body.username);

    // 검색된 유저를 기준으로 jwt 토큰 생성
    const tokens = await jwtService.issueNewTokenAsync(foundUser);
    return res.status(200).json(tokens);
  }),
);

// 만료된 jwt를 refresh token을 사용해서 갱신합니다.
router.post(
  '/token/refresh',
  warpAsync(async function (req, res) {
    const refreshTokenId = req.jwt.tokenId;
    // refresh token에 있는 tokenId를 가지고 토큰 갱신
    const tokens = await jwtService.refreshTokenAsync(refreshTokenId);

    return res.status(200).json(tokens);
  }),
);

// 현재 활성화된 token을 refresh token으로 비활성화(로그아웃) 합니다.
router.delete(
  '/token/refresh',
  warpAsync(async function (req, res) {
    const refreshTokenId = req.jwt.tokenId;
    // refresh token에 있는 tokenId를 가지고 토큰 제거
    await jwtService.removeRefreshTokenAsync(refreshTokenId);

    return res.status(201).end();
  }),
);

module.exports = router;
