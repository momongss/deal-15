const RefreshToken = require('@src/model/refresh-token');

// db에 refresh token을 추가
// db에 추가된 refresh_token의 id를 반환
function add(refreshToken) {
  return 0;
}

// db에 refresh token을 제거
function remove(id) {}

// 해당 id의 refresh token이 db에서 해당 refresh token을 검색 후 반환
// 만약 없으면 null
function find(id) {
  return null;

  // const refreshToken = new RefreshToken(...);
  // return refreshToken;
}

// id로 refresh token이 db에 존재하는지 확인
function exists(id) {
  return false;
}

module.exports = {
  add,
  remove,
  find,
  exists,
};
