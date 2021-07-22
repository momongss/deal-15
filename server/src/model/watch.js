class Watch {
  constructor(id, userId, productId, createdDatetime) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.createdDatetime = createdDatetime;
  }
}

Watch.table = 'watches';
Watch.fields = ['id', 'user_id', 'product_id', 'created_datetime'];

Watch.fromRow = function (row) {
  const array = [];
  for (const field of Watch.fields) {
    array.push(row[field]);
  }
  return new Watch(...array);
};

module.exports = Watch;
