const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const invalidRequest = require('@src/middleware/invalid-request');
const wrapAsync = require('@src/middleware/wrap-async');

const userService = require('@src/service/user');
const productService = require('@src/service/product');

// 회원가입
router.post(
  '/',
  invalidRequest(
    body('username').trim().isLength({ max: 30 }).notEmpty(),
    body('location').trim().isLength({ max: 10 }).notEmpty(),
  ),
  wrapAsync(async function (req, res) {
    const { username, location } = req.body;
    await userService.signUpAsync(username, location);

    return res.status(201).end();
  }),
);

router.get(
  '/me/locations',
  wrapAsync(async function (req, res) {
    const user = await userService.findAsync(req.jwt.userId);
    const locations = [
      {
        position: 1,
        location: user.location1,
      },
    ];
    if (user.location2) {
      locations.push({
        position: 2,
        location: user.location2,
      });
    }
    return res.status(200).json(locations);
  }),
);

// 내 동네 추가하기
router.post(
  '/me/locations',
  invalidRequest(body('location').trim().isLength({ max: 10 }).notEmpty()),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const { location } = req.body;

    await userService.addLocation(userId, location);

    return res.status(200).json({
      position: 2,
      location: location,
    });
  }),
);

// 동네 이름 변경
router.put(
  '/me/locations/position/:position',
  invalidRequest(
    body('location').trim().isLength({ max: 10 }).notEmpty(),
    param('position').isIn([1, 2]).isNumeric().notEmpty(),
  ),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const position = +req.params.position;
    const { location } = req.body;

    await userService.updateLocation(userId, location, position);

    return res.status(201).end();
  }),
);

// 동네 삭제
router.delete(
  '/me/locations/position/:position',
  invalidRequest(param('position').isIn([1, 2]).isNumeric().notEmpty()),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const position = +req.params.position;

    await userService.removeLocation(userId, position);
    return res.status(201).end();
  }),
);

// 현재 내가 선택한 동네 정보 가져오기
router.get(
  '/me/locations/selection',
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const user = await userService.findAsync(userId);

    return res.status(200).json({
      position: user.locationSelection,
      location: user[`location${user.locationSelection}`],
    });
  }),
);

// 내 동네 선택하기
router.put(
  '/me/locations/selection',
  invalidRequest(body('position').isIn([1, 2]).isNumeric().notEmpty()),
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const position = +req.body.position;

    await userService.updateLocationSelection(userId, position);
    return res.status(201).end();
  }),
);

// 회원의 판매목록을 획득
router.get(
  '/me/sales',
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const mySales = await productService.getMySalesProductSimplesAsync(userId);
    return res.status(200).json(mySales);
  }),
);

// 회원의 채팅록록을 획득
router.get('/me/chats', function (req, res) {
  res.send('GET /api/v1/users/me/chats');
});

// 회원의 관심목록을 획득
router.get(
  '/me/watches',
  wrapAsync(async function (req, res) {
    const { userId } = req.jwt;
    const myWatches = await productService.getMyWatchesProductSimplesAsync(userId);
    return res.status(200).json(myWatches);
  }),
);

module.exports = router;
