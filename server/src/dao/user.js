const User = require('@src/model/user');
const { selectOneAsync, selectExistsAsync, insertAsync, updateAsync } = require('@src/dao/db');

// id를 통해서 해당 user 찾고 반환
// 만약 없으면 null을 반환
async function findAsync(id) {
  const row = await selectOneAsync(User.table, User.fields, [['id', '=', id]], [], 1);

  return row ? User.fromRow(row) : null;
}

// username을 통해서 해당 user 찾고 반환
// 만약 없으면 null을 반환
async function findByUsernameAsync(username) {
  const row = await selectOneAsync(User.table, User.fields, [['username', '=', username]], [], 1);
  return row ? User.fromRow(row) : null;
}

// username으로 db에 동일한 username이 존재하는 확인
async function existsByUsernameAsync(username) {
  return await selectExistsAsync(User.table, ['username'], [username]);
}

// 넘겨 받은 user를 db에 추가하고 insertId를 반환
async function addAsync(user) {
  const insertId = await insertAsync(
    User.table,
    ['username', 'location1'],
    [user.username, user.location1],
  );

  const newUser = await findAsync(insertId);

  user.id = newUser.id;
  user.createdDatetime = newUser.createdDatetime;
  user.updatedDatetime = newUser.updatedDatetime;

  return insertId;
}

async function updateUserAsync(user) {
  await updateAsync(
    'users',
    ['location1', 'location2', 'location_selection'],
    [user.location1, user.location2, user.locationSelection],
    [['id', '=', user.id]],
  );
}

module.exports = {
  findAsync,
  findByUsernameAsync,
  existsByUsernameAsync,
  addAsync,
  updateAsync: updateUserAsync,
};
