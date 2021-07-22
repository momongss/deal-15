class RefreshToken {
  constructor(id, userId, validUntil, createdDatetime) {
    this.id = id;
    this.userId = userId;
    this.validUntil = validUntil;
    this.createdDatetime = createdDatetime;
  }
}

RefreshToken.table = 'refresh_tokens';
RefreshToken.fields = ['id', 'user_id', 'valid_until', 'created_datetime'];

RefreshToken.fromRow = function (row) {
  const array = [];
  for (const field of RefreshToken.fields) {
    array.push(row[field]);
  }
  return new RefreshToken(...array);
};

module.exports = RefreshToken;
