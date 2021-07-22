class ProductDetail {
  constructor(product, category, images, user, count) {
    this.id = product.id;
    this.title = product.title;
    this.category = category.title;
    this.status = product.status;
    this.price = product.price;
    this.images = images.map((i) => i.imageUri);
    this.createDatetime = product.createDatetime;
    this.content = product.content;
    this.count = count;
    this.saler = {
      id: user.id,
      username: user.username,
      location: product.location,
    };
  }
}

module.exports = ProductDetail;
