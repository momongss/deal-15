// jwt를 hashing 하기 위한 128bit 이상의 base64 encoded string
const secret = process.env.JWT_SECRET;
// jwt hashing 알고리즘
const algorithm = process.env.JWT_ALGORITHM || 'HS254';
// access token 만료 시간, 기본 30분
let accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || 1800;
// refresh token 만료 시간, 기본 7일
let refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || 604800;

if (!secret) {
  throw new Error('JWT secret 설정이 없습니다.');
}

try {
  accessExpiresIn = parseInt(accessExpiresIn);
} catch {
  accessExpiresIn = 1800;
}

try {
  refreshExpiresIn = parseInt(refreshExpiresIn);
} catch {
  refreshExpiresIn = 604800;
}

module.exports = {
  secret,
  algorithm,
  accessExpiresIn,
  refreshExpiresIn,
};
