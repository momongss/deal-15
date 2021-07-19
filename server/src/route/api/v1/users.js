const express = require('express');
const router = express.Router();

// 회원가입
router.post('/', function (req, res) {
  res.send('POST /api/v1/users');
});

// 내 동네 추가하기
router.post('/me/locations', function (req, res) {
  res.send('POST /api/v1/users/me/locations');
});

// 동네 이름 변경
router.put('/me/locations/:position', function (req, res) {
  res.send('PUT /api/v1/users/me/locations/{position}');
});

// 동네 삭제
router.delete('/me/locations/:position', function (req, res) {
  res.send('DELETE /api/v1/users/me/locations/{position}');
});

// 현재 내가 선택한 동네 정보 가져오기
router.get('/me/locations/selection', function (req, res) {
  res.send('GET /api/v1/users/me/locations/selection');
});

// 내 동네 선택하기
router.put('/me/locations/selection', function (req, res) {
  res.send('PUT /api/v1/users/me/locations/selection');
});

// 회원의 판매목록을 획득
router.get('/me/sales', function (req, res) {
  res.send('GET /api/v1/users/me/sales');
});

// 회원의 채팅록록을 획득
router.get('/me/chats', function (req, res) {
  res.send('GET /api/v1/users/me/chats');
});

// 회원의 관심목록을 획득
router.get('/me/watches', function (req, res) {
  res.send('GET /api/v1/users/me/watches');
});

module.exports = router;
