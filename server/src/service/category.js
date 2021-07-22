const ApiError = require('@src/core/error/api-error');

const categoryDao = require('@src/dao/category');

async function getAllAsync() {
  return await categoryDao.allAsync();
}

async function addCategoryAsync(category) {
  const duplicated = await categoryDao.existsByTitleAsync(category.title);
  if (duplicated) {
    throw new ApiError('DUPLICATED_CATEGORY_TITLE', '이미 중복된 카테고리 이름이 있습니다.', 409);
  }

  await categoryDao.addAsync(category);
}

module.exports = {
  getAllAsync,
  addCategoryAsync,
};
