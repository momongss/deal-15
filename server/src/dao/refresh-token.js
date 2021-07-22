const RefreshToken = require('@src/model/refresh-token');

const { selectOneAsync, selectExistsAsync, insertAsync, deleteAsync } = require('@src/dao/db');

// db에 refresh token을 추가
// db에 추가된 refresh_token의 id를 반환
async function addAsync(refreshToken) {
  const id = await insertAsync(
    RefreshToken.table,
    ['user_id', 'valid_until'],
    [refreshToken.userId, refreshToken.validUntil],
  );

  const newRefreshToken = await findAsync(id);

  refreshToken.id = newRefreshToken.id;
  refreshToken.createdDatetime = newRefreshToken.createdDatetime;

  return id;
}

// db에 refresh token을 제거
async function removeAsync(id) {
  await deleteAsync(RefreshToken.table, [['id', '=', id]]);
}

// 해당 id의 refresh token이 db에서 해당 refresh token을 검색 후 반환
// 만약 없으면 null
async function findAsync(id) {
  const row = await selectOneAsync(
    RefreshToken.table,
    RefreshToken.fields,
    [['id', '=', id]],
    [],
    1,
  );
  return row ? RefreshToken.fromRow(row) : null;
}

// id로 refresh token이 db에 존재하는지 확인
async function existsAsync(id) {
  return await selectExistsAsync('refresh_tokens', ['id'], [id]);
}

module.exports = {
  addAsync,
  removeAsync,
  findAsync,
  existsAsync,
};
