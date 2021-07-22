const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const ApiError = require('@root/src/core/error/api-error');
const wrapAsync = require('@src/middleware/wrap-async');
const fileService = require('@src/service/file');

const storage = multer.diskStorage({
  destination: 'uploads/images',
  filename: function (req, file, callback) {
    callback(null, Date.now().toString() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    if (!file.mimetype.includes('image')) {
      return callback(new ApiError('NON_IMAGE_FILE', '이미지만 업로드 해주세요.', 400));
    }
    return callback(null, true);
  },
});

router.post(
  '/',
  upload.single('image'),
  wrapAsync(async function (req, res) {
    if (!req.file) {
      throw new ApiError('NO_UPLOAD_IMAGE', 'image로 사진을 업로드 해주세요.', 400);
    }

    const { userId } = req.jwt;
    const file = req.file;
    await fileService.addImageAsync(userId, file.originalname, file.path);

    return res.status(200).json({
      image: file.path,
    });
  }),
);

module.exports = router;
