const express = require('express');
const router = express.Router();

// 채팅방 관련 데이터를 획득
router.get('/:id', function (req, res) {
  res.send('GET /api/v1/chats/{id}');
});

// 채팅방 나가기
router.delete('/:id', function (req, res) {
  res.send('DELETE /api/v1/chats/{id}');
});

// 채팅방의 메세지 전송
router.post('/:id/messages', function (req, res) {
  res.send('POST /api/v1/chats/{id}/messages');
});

// 채팅방의 부분 업데이트 정보 획득
router.get('/:id/refresh', function (req, res) {
  res.send('GET /api/v1/chats/{id}/refresh');
});

module.exports = router;
