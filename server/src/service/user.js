const userDao = require('@src/dao/user');

const User = require('@src/model/user');
const ApiError = require('@src/core/error/api-error');

async function findByUsernameOrThorwAsync(username) {
  const user = await userDao.findByUsernameAsync(username);

  // 검색된 유저가 없으면 에러
  if (!user) {
    throw new ApiError('NON_EXISTENT_USER', '일치하는 유저가 없습니다.', 404);
  }

  return user;
}

async function signUpAsync(username, location) {
  const existence = await userDao.existsByUsernameAsync(username);
  if (existence) {
    throw new ApiError('USER_ALREADY_EXISTS', '이미 존재하는 유저 id입니다.', 409);
  }

  const user = new User(null, username, location, null, null, null);
  await userDao.addAsync(user);
  return user;
}

async function findAsync(userId) {
  const user = await userDao.findAsync(userId);
  return user;
}

async function addLocation(userId, locationName) {
  const user = await userDao.findAsync(userId);
  if (user.location2) {
    throw new ApiError('CANNOT_ADD_LOCATION_MORE', '더 이상 동네를 추가할 수 없습니다.', 400);
  }

  if (user.location1 === locationName) {
    throw new ApiError('DUPLICATED_LOCATION_NAME', '이미 존재하는 이름입니다.', 409);
  }

  user.location2 = locationName;
  await userDao.updateAsync(user);
}

async function updateLocation(userId, location, position) {
  const user = await userDao.findAsync(userId);

  if (position === 2 && !user.location2) {
    throw new ApiError('NON_EXISTENC_LOCATION', '해당 동네가 존재하지 않습니다.', 404);
  }
  if (user.location2) {
    if (
      (position === 1 && user.location2 === location) ||
      (position === 2 && user.location1 === location)
    ) {
      throw new ApiError('DUPLICATED_LOCATION_NAME', '이미 존재하는 이름입니다.', 409);
    }
  }

  user[`location${position}`] = location;
  await userDao.updateAsync(user);
}

async function removeLocation(userId, position) {
  const user = await userDao.findAsync(userId);

  if (position === 2 && !user.location2) {
    throw new ApiError('NON_EXISTENC_LOCATION', '존재하지 않는 위치입니다.', 400);
  } else if (position === 1 && !user.location2) {
    throw new ApiError('CANNOT_DELETE_LOCATION', '동네는 반드시 1개 이상 있어야 합니다.', 400);
  }

  if (position === 1 && user.location2) {
    user.location1 = user.location2;
  }
  user.location2 = null;
  user.locationSelection = 1;

  await userDao.updateAsync(user);
}

async function updateLocationSelection(userId, position) {
  const user = await userDao.findAsync(userId);

  if (position === 2 && !user.location2) {
    throw new ApiError('NON_EXISTENC_LOCATION', '존재하지 않는 위치입니다.', 400);
  }

  user.locationSelection = position;

  await userDao.updateAsync(user);
}

module.exports = {
  findByUsernameOrThorwAsync,
  signUpAsync,
  findAsync,
  addLocation,
  updateLocation,
  removeLocation,
  updateLocationSelection,
};
