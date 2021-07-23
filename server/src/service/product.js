const ApiError = require('@src/core/error/api-error');
const Product = require('@src/model/product');
const ProductImage = require('@src/model/product-image');
const ProductDetail = require('@src/dto/product-detail');
const ProductRefresh = require('@src/dto/product-refresh');
const ProductSimple = require('@src/dto/product-simple');
const Watch = require('@src/model/watch');

const productDao = require('@src/dao/product');
const categoryDao = require('@src/dao/category');
const userDao = require('@src/dao/user');

async function setProductImagesAsync(productId, imageUris) {
  // 해당 이미지 모두 지우기
  await productDao.removeAllProductImagesAsync(productId);

  // 이미지 모두 할당
  for (const imageUri of imageUris) {
    const image = new ProductImage(null, productId, imageUri);
    await productDao.addProductImageAsync(image);
  }
}

async function addProductAsync(userId, body) {
  const { images: imageUris, title, category: categoryTitle, content, location } = body;
  const price = +body.price;

  // 해당 카테고리 id가 있는가?
  const category = await categoryDao.findByTitleAsync(categoryTitle);
  if (!category) {
    throw new ApiError('NON_EXISTENCE_CATEGORY', '존재하지 않는 카테고리 입니다.', 400);
  }

  // 상품 추가
  const product = new Product(null, userId, title, price, category.id, content, location);
  await productDao.addProductAsync(product);

  // 상품 이미지 추가
  await setProductImagesAsync(product.id, imageUris);

  return product.id;
}

async function updateProductAsync(userId, productId, body) {
  const product = await productDao.findProductAsync(productId);
  if (!product || product.deleted) {
    throw new ApiError('NON_EXISTENCE_PRODUCT', '상품이 존재하지 않습니다.', 404);
  }
  if (product.userId !== userId) {
    throw new ApiError('NO_PSERMISSION', '해당 상품에 권한이 없습니다.', 403);
  }

  const { images: imageUris, title, category: categoryTitle, content, location } = body;
  const price = +body.price;

  // 해당 카테고리 id가 있는가?
  const category = await categoryDao.findByTitleAsync(categoryTitle);
  if (!category) {
    throw new ApiError('NON_EXISTENCE_CATEGORY', '존재하지 않는 카테고리 입니다.', 400);
  }

  // 상품 정보 수정
  product.title = title;
  product.price = price;
  product.categoryId = category.id;
  product.content = content;
  product.location = location;
  await productDao.updateProductAsync(product);

  // 이미지 갱신
  await setProductImagesAsync(productId, imageUris);
}

async function getProductDetailAsync(productId) {
  const product = await productDao.findProductAsync(productId);
  if (!product || product.deleted) {
    throw new ApiError('NON_EXISTENCE_PRODUCT', '상품이 존재하지 않습니다.', 404);
  }
  // views count up
  await productDao.upViewCountAsync(productId);

  const category = await categoryDao.findAsync(product.categoryId);
  const images = await productDao.findAllProductImages(productId);
  const user = await userDao.findAsync(product.userId);
  const count = await productDao.getProductCountAsync(productId);

  const productDetail = new ProductDetail(product, category, images, user, count);
  return productDetail;
}

async function deleteProductAsync(userId, productId) {
  const product = await productDao.findProductAsync(productId);
  if (!product || product.deleted) {
    throw new ApiError('NON_EXISTENCE_PRODUCT', '상품이 존재하지 않습니다.', 404);
  }
  if (product.userId !== userId) {
    throw new ApiError('NO_PSERMISSION', '해당 상품에 권한이 없습니다.', 403);
  }

  await productDao.deleteProductAsync(productId);
}

async function getProductRefreshAsync(productId) {
  const product = await productDao.findProductAsync(productId);
  if (!product || product.deleted) {
    throw new ApiError('NON_EXISTENCE_PRODUCT', '상품이 존재하지 않습니다.', 404);
  }
  const count = await productDao.getProductCountAsync(productId);

  return new ProductRefresh(product, count);
}

async function updateProductStatusAsync(userId, productId, status) {
  const product = await productDao.findProductAsync(productId);
  if (!product || product.deleted) {
    throw new ApiError('NON_EXISTENCE_PRODUCT', '상품이 존재하지 않습니다.', 404);
  }
  if (product.userId !== userId) {
    throw new ApiError('NO_PSERMISSION', '해당 상품에 권한이 없습니다.', 403);
  }
  await productDao.updateProductStatusAsync(productId, status);
}

async function addWatchToProductAsync(userId, productId) {
  const product = await productDao.findProductAsync(productId);
  if (!product || product.deleted) {
    throw new ApiError('NON_EXISTENCE_PRODUCT', '상품이 존재하지 않습니다.', 404);
  }

  if (!(await productDao.existsWatchAsync(userId, productId))) {
    const watch = new Watch(null, userId, productId);
    await productDao.addWatchAsync(watch);
  }
}

async function removeWatchFromProductAsync(userId, productId) {
  const product = await productDao.findProductAsync(productId);
  if (!product || product.deleted) {
    throw new ApiError('NON_EXISTENCE_PRODUCT', '상품이 존재하지 않습니다.', 404);
  }

  await productDao.removeWatchAsync(userId, productId);
}

async function productToProductSimpleAsync(userId, product, watched = false) {
  const image = await productDao.findProductImageUriAsync(product.id);
  const count = await productDao.getProductCountAsync(product.id);
  const watch = watched || (await productDao.existsWatchAsync(userId, product.id));
  return new ProductSimple(product, image, count, watch);
}

async function getMySalesProductSimplesAsync(userId) {
  const products = await productDao.findAllProductsByUserIdAsync(userId);

  // 나도 알아! 나도 안다고! 이렇게 하면 않좋은거! ㅠㅠ
  const productSimples = Array.from(
    await Promise.all(products.map((p) => productToProductSimpleAsync(userId, p))),
  );

  return productSimples;
}

async function getMyWatchesProductSimplesAsync(userId) {
  const products = await productDao.findAllProductsByWatchAsync(userId);

  const productSimples = Array.from(
    await Promise.all(products.map((p) => productToProductSimpleAsync(userId, p, true))),
  );

  return productSimples;
}

async function searchProductsAsync(userId, location, categoryTitle) {
  let categoryId;
  if (categoryTitle) {
    const category = await categoryDao.findByTitleAsync(categoryTitle);
    if (category) {
      categoryId = category.id;
    } else {
      return [];
    }
  }

  const products = await productDao.findProductsByLocationAndCategoryId(location, categoryId, 10);
  const productSimples = Array.from(
    await Promise.all(products.map((p) => productToProductSimpleAsync(userId, p))),
  );

  return productSimples;
}

module.exports = {
  addProductAsync,
  updateProductAsync,
  getProductDetailAsync,
  deleteProductAsync,
  getProductRefreshAsync,
  updateProductStatusAsync,
  addWatchToProductAsync,
  removeWatchFromProductAsync,
  getMySalesProductSimplesAsync,
  getMyWatchesProductSimplesAsync,
  searchProductsAsync,
};
