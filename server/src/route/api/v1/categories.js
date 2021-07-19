const express = require('express');
const router = express.Router();

// 삼품 카테고리 목록을 불러온다
router.get('/', function (req, res) {
  res.send('GET /api/v1/categories');
});

// 새로운 카테고리 등록
router.post('/', function (req, res) {
  res.send('POST /api/v1/categories');
});

module.exports = router;
