class Category {
  constructor(id, title, imageUri) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
  }
}

Category.table = 'categories';
Category.fields = ['id', 'title', 'image_uri'];

Category.fromRow = function (row) {
  const array = [];
  for (const field of Category.fields) {
    array.push(row[field]);
  }
  return new Category(...array);
};

module.exports = Category;
