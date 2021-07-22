const { body, validationResult } = require('express-validator');

const ApiError = require('@src/core/error/api-error');

function handleInvalidRequest(req, _, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 만약 request가 올바르지 않으면 에러
    throw new ApiError('INVALID_REQUEST', '입력값이 올바르지 않습니다.', 400, errors.array());
  }

  return next();
}

module.exports = (...validationRules) => [...validationRules, handleInvalidRequest];
