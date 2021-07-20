// API에서 발생하는 에러
// 별도의 handler를 통해서 처리
module.exports = class ApiError extends Error {
  constructor(
    code = 'INTERNAL_SERVER_ERROR',
    message = '서버에서 알 수 없는 에러가 발생했습니다.',
    status = 500,
    details = null,
  ) {
    super(message);
    this.errorCode = code;
    this.status = status;
    this.details = details;
  }
};
