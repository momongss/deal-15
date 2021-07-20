const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const RefreshToken = require('@src/model/refresh-token');
const ApiError = require('@src/core/error/api-error');

const jwtConfig = require('@src/config/jwt');
const refreshTokenDao = require('@src/dao/refresh-token');
const userDao = require('@src/dao/user');

const jwtSecret = Buffer.from(jwtConfig.secret, 'base64');

function issueNewToken(user) {
  const accessToken = jwt.sign(
    {
      type: 'access',
      userId: user.id,
      username: user.username,
    },
    jwtSecret,
    {
      algorithm: jwtConfig.algorithm,
      expiresIn: jwtConfig.accessExpiresIn,
    },
  );

  const refreshTokenValidUntil = dayjs().add(jwtConfig.refreshExpiresIn, 'second').toDate();
  const refreshTokenEntity = new RefreshToken(null, user.id, refreshTokenValidUntil, null);
  const refreshTokenId = refreshTokenDao.add(refreshTokenEntity);

  const refreshToken = jwt.sign(
    {
      type: 'refresh',
      tokenId: refreshTokenId,
    },
    jwtSecret,
    {
      algorithm: jwtConfig.algorithm,
      expiresIn: jwtConfig.refreshExpiresIn,
    },
  );

  return {
    access: accessToken,
    refresh: refreshToken,
  };
}

function refreshToken(refreshTokenId) {
  const foundRefreshToken = refreshTokenDao.find(refreshTokenId);
  if (foundRefreshToken === null) {
    throw new ApiError('NON_EXISTENT_REFRESH_TOKEN', '존재하지 않는 refresh token입니다.', 404);
  }

  const user = userDao.find(foundRefreshToken.userId);
  return issueNewToken(user);
}

function removeRefreshToken(refreshTokenId) {
  if (!refreshTokenDao.exists(refreshTokenId)) {
    throw new ApiError('NON_EXISTENT_REFRESH_TOKEN', '존재하지 않는 refresh token입니다.', 404);
  }
  refreshTokenDao.remove(refreshTokenId);
}

module.exports = {
  issueNewToken,
  refreshToken,
  removeRefreshToken,
};
