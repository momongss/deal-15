const express = require('express');
const router = express.Router();

// 상품 목록 불러오기
router.get('/', function (req, res) {
  res.send('GET /api/v1/products');
});

// 상품 등록하기
router.post('/', function (req, res) {
  res.send('POST /api/v1/products');
});

// 상품의 상세 정보를 불러온다.
router.get('/:id', function (req, res) {
  res.send('GET /api/v1/products/{id}');
});

// 상품 정보 수정하기
router.put('/:id', function (req, res) {
  res.send('PUT /api/v1/products/{id}');
});

// 상품 정보 삭제하기
router.delete('/:id', function (req, res) {
  res.send('DELETE /api/v1/products/{id}');
});

// 현재 상품의 부분 업데이트 정보 획득
router.get('/:id/refresh', function (req, res) {
  res.send('GET /api/v1/products/{id}/refresh');
});

// 삼품 현재 상태 변경하기
router.put('/:id/status', function (req, res) {
  res.send('PUT /api/v1/products/{id}/status');
});

// 상품 관심목록에 등록
router.post('/:id/watch', function (req, res) {
  res.send('POST /api/v1/products/{id}/watch');
});

// 상품 관심목록에서 제거
router.delete('/:id/watch', function (req, res) {
  res.send('DELETE /api/v1/products/{id}/watch');
});

// 상품과 관련된 채팅창 목록을 가지고 온다.
router.get('/:id/chats', function (req, res) {
  res.send('GET /api/v1/products/{id}/chats');
});

// 상품에 채팅창을 처음 만든다.
router.post('/:id/chats', function (req, res) {
  res.send('POST /api/v1/products/{id}/chats');
});

module.exports = router;
