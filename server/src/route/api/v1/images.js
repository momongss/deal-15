const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
  res.send('POST /api/v1/images');
});

module.exports = router;
