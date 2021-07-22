class ProductImage {
  constructor(id, productId, imageUri) {
    this.id = id;
    this.productId = productId;
    this.imageUri = imageUri;
  }
}

ProductImage.table = 'product_images';
ProductImage.fields = ['id', 'product_id', 'image_uri'];

ProductImage.fromRow = function (row) {
  const array = [];
  for (const field of ProductImage.fields) {
    array.push(row[field]);
  }
  return new ProductImage(...array);
};

module.exports = ProductImage;
