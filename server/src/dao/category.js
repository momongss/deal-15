const Category = require('@src/model/category');
const { selectAsync, selectOneAsync, selectExistsAsync, insertAsync } = require('@src/dao/db');

async function allAsync() {
  const rows = await selectAsync(Category.table, Category.fields, [], [['id', ['ASC']]]);
  const categories = rows.map((r) => Category.fromRow(r));
  return categories;
}

async function findAsync(id) {
  const row = await selectOneAsync(Category.table, Category.fields, [['id', '=', id]], [], 1);
  return row ? Category.fromRow(row) : null;
}

async function existsByTitleAsync(title) {
  return await selectExistsAsync(Category.table, ['title'], [title]);
}

async function findByTitleAsync(title) {
  const row = await selectOneAsync(Category.table, Category.fields, [['title', '=', title]], [], 1);
  return row ? Category.fromRow(row) : null;
}

async function addAsync(category) {
  const id = await insertAsync(
    Category.table,
    ['title', 'image_uri'],
    [category.title, category.imageUri],
  );
  category.id = id;
  return id;
}

module.exports = {
  allAsync,
  findAsync,
  existsByTitleAsync,
  findByTitleAsync,
  addAsync,
};
