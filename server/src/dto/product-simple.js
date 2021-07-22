class ProductSimple {
  constructor(product, imageUri, count, watch) {
    this.id = product.id;
    this.image = imageUri;
    this.title = product.title;
    this.watch = watch;
    this.createDatetime = product.createDatetime;
    this.price = product.price;
    this.count = {
      chat: count.chat,
      watch: count.watch,
    };
  }
}

module.exports = ProductSimple;
