const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const RefreshToken = require('@src/model/refresh-token');
const ApiError = require('@src/core/error/api-error');

const jwtConfig = require('@src/config/jwt');
const refreshTokenDao = require('@src/dao/refresh-token');
const userDao = require('@src/dao/user');

const jwtSecret = Buffer.from(jwtConfig.secret, 'base64');

async function issueNewTokenAsync(user) {
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
  await refreshTokenDao.addAsync(refreshTokenEntity);

  const refreshToken = jwt.sign(
    {
      type: 'refresh',
      tokenId: refreshTokenEntity.id,
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

async function refreshTokenAsync(refreshTokenId) {
  const foundRefreshToken = await refreshTokenDao.findAsync(refreshTokenId);
  if (foundRefreshToken === null) {
    throw new ApiError('NON_EXISTENT_REFRESH_TOKEN', '존재하지 않는 refresh token입니다.', 404);
  }

  await removeRefreshTokenAsync(refreshTokenId);
  const user = await userDao.findAsync(foundRefreshToken.userId);
  return await issueNewTokenAsync(user);
}

async function removeRefreshTokenAsync(refreshTokenId) {
  const existence = await refreshTokenDao.existsAsync(refreshTokenId);
  if (!existence) {
    throw new ApiError('NON_EXISTENT_REFRESH_TOKEN', '존재하지 않는 refresh token입니다.', 404);
  }
  await refreshTokenDao.removeAsync(refreshTokenId);
}

module.exports = {
  issueNewTokenAsync,
  refreshTokenAsync,
  removeRefreshTokenAsync,
};
