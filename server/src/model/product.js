class Product {
  constructor(
    id,
    userId,
    title,
    price,
    categoryId,
    content,
    location,
    status = Product.status.SALE,
    views = 0,
    deleted = 0,
    createdDatetime = null,
    updatedDatetime = null,
    deletedDatetime = null,
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.price = price;
    this.categoryId = categoryId;
    this.content = content || '';
    this.location = location;
    this.status = status;
    this.views = views;
    this.deleted = deleted;
    this.createdDatetime = createdDatetime;
    this.updatedDatetime = updatedDatetime;
    this.deletedDatetime = deletedDatetime;
  }

  setNew(newProduct) {
    this.id = newProduct.id;
    this.createdDatetime = newProduct.createdDatetime;
    this.updatedDatetime = newProduct.updatedDatetime;
  }
}

Product.table = 'products';
Product.fields = [
  'id',
  'user_id',
  'title',
  'price',
  'category_id',
  'content',
  'location',
  'status',
  'views',
  'deleted',
  'created_datetime',
  'updated_datetime',
  'deleted_datetime',
];

Product.status = Object.freeze({
  SALE: 'SALE',
  RESERVED: 'RESERVED',
  SOLDOUT: 'SOLDOUT',
});

Product.fromRow = function (row) {
  const array = [];
  for (const field of Product.fields) {
    array.push(row[field]);
  }
  return new Product(...array);
};

module.exports = Product;
