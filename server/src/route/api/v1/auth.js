const express = require('express');
const router = express.Router();

// 로그인 후 토큰을 반환 받습니다.
router.post('/token', function (req, res) {
  res.send('POST /api/v1/auth/token');
});

// 만료된 jwt를 refresh token을 사용해서 갱신합니다.
router.post('/token/refresh', function (req, res) {
  res.send('POST /api/v1/auth/token/refresh');
});

// 현재 활성화된 token을 비활성화(로그아웃) 합니다.
router.delete('/token/:accessToken', function (req, res) {
  res.send('DELETE /api/v1/token/{accessToken}');
});

module.exports = router;
