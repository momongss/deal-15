const Product = require('@src/model/product');
const ProductImage = require('@src/model/product-image');
const Watch = require('@src/model/watch');

const {
  RawValue,
  selectRawAsync,
  selectOneRawAsync,
  selectOneAsync,
  selectAsync,
  selectExistsAsync,
  insertAsync,
  updateAsync,
  deleteAsync,
} = require('@src/dao/db');

async function findProductAsync(productId) {
  const row = await selectOneAsync(Product.table, Product.fields, [['id', '=', productId]], [], 1);
  return row ? Product.fromRow(row) : null;
}

async function addProductAsync(product) {
  const productId = await insertAsync(
    Product.table,
    ['user_id', 'title', 'price', 'category_id', 'content', 'location', 'status'],
    [
      product.userId,
      product.title,
      product.price,
      product.categoryId,
      product.content,
      product.location,
      product.status,
    ],
  );
  const newProduct = await findProductAsync(productId);
  product.setNew(newProduct);
}

async function removeAllProductImagesAsync(productId) {
  await deleteAsync(ProductImage.table, [['product_id', '=', productId]]);
}

async function addProductImageAsync(productImage) {
  const id = await insertAsync(
    ProductImage.table,
    ['product_id', 'image_uri'],
    [productImage.productId, productImage.imageUri],
  );
  productImage.id = id;
}

async function findProductImageUriAsync(productId) {
  const { image_uri: imageUri } = await selectOneAsync(
    ProductImage.table,
    ['image_uri'],
    [['product_id', '=', productId]],
    [['id', 'ASC']],
    1,
  );
  return imageUri;
}

async function findAllProductImages(productId) {
  const rows = await selectAsync(
    ProductImage.table,
    ProductImage.fields,
    [['product_id', '=', productId]],
    [['id', 'ASC']],
  );
  const images = rows.map((r) => ProductImage.fromRow(r));
  return images;
}

async function getProductCountAsync(productId) {
  const row = await selectOneRawAsync(`
    SELECT
      (SELECT COUNT(*) FROM chats WHERE product_id = ${productId} AND deleted = 0) as chat,
      (SELECT COUNT(*) FROM watches WHERE product_id = ${productId}) as watch,
      (SELECT views FROM products WHERE id = ${productId}) as views
  `);

  return {
    chat: row.chat,
    watch: row.watch,
    views: row.views,
  };
}

async function upViewCountAsync(productId) {
  await updateAsync(
    Product.table,
    ['views'],
    [new RawValue(`\`views\` + 1`)],
    [['id', '=', productId]],
  );
}

async function updateProductAsync(product) {
  const productId = await updateAsync(
    Product.table,
    ['title', 'price', 'category_id', 'content', 'location'],
    [product.title, product.price, product.categoryId, product.content, product.location],
    [['id', '=', product.id]],
  );
  const newProduct = await findProductAsync(productId);
  product.setNew(newProduct);
}

async function deleteProductAsync(productId) {
  await updateAsync(
    Product.table,
    ['deleted', 'deleted_datetime'],
    [1, new RawValue('CURRENT_TIMESTAMP()')],
    [['id', '=', productId]],
  );
}

async function existsProductNotDeleted(productId) {
  return await selectExistsAsync(Product.table, ['id', 'deleted'], [productId, 0]);
}

async function updateProductStatusAsync(productId, status) {
  await updateAsync(Product.table, ['status'], [status], [['id', '=', productId]]);
}

async function existsWatchAsync(userId, productId) {
  return selectExistsAsync(Watch.table, ['user_id', 'product_id'], [userId, productId]);
}

async function addWatchAsync(watch) {
  const id = await insertAsync(
    Watch.table,
    ['user_id', 'product_id'],
    [watch.userId, watch.productId],
  );
  watch.id = id;
}

async function removeWatchAsync(userId, productId) {
  await deleteAsync(Watch.table, [
    ['user_id', '=', userId],
    ['product_id', '=', productId],
  ]);
}

async function findAllProductsByUserIdAsync(userId) {
  const rows = await selectAsync(
    Product.table,
    Product.fields,
    [
      ['user_id', '=', userId],
      ['deleted', '=', 0],
    ],
    [['id', 'DESC']],
  );
  return rows.map((r) => Product.fromRow(r));
}

async function findAllProductsByWatchAsync(userId) {
  const rows = await selectRawAsync(
    `SELECT p.* FROM products AS p JOIN watches AS w ON p.id = w.product_id AND w.user_id = ?`,
    [userId],
  );
  return rows.map((r) => Product.fromRow(r));
}

async function findProductsByLocationAndCategoryId(location, categoryId, limit) {
  const conditions = [['location', '=', location]];
  if (categoryId) {
    conditions.push(['category_id', '=', categoryId]);
  }

  const rows = await selectAsync(
    Product.table,
    Product.fields,
    conditions,
    [['id', 'DESC']],
    limit,
  );
  return rows.map((r) => Product.fromRow(r));
}

module.exports = {
  findProductAsync,
  addProductAsync,
  findProductImageUriAsync,
  findAllProductImages,
  removeAllProductImagesAsync,
  addProductImageAsync,
  getProductCountAsync,
  upViewCountAsync,
  updateProductAsync,
  deleteProductAsync,
  existsProductNotDeleted,
  updateProductStatusAsync,
  existsWatchAsync,
  addWatchAsync,
  removeWatchAsync,
  findAllProductsByUserIdAsync,
  findAllProductsByWatchAsync,
  findProductsByLocationAndCategoryId,
};
