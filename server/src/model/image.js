class Image {
  constructor(id, userId, uploadName, path, createdDatetime) {
    this.id = id;
    this.userId = userId;
    this.uploadName = uploadName;
    this.path = path;
    this.createdDatetime = createdDatetime;
  }
}

Image.table = 'images';
Image.fields = ['id', 'user_id', 'upload_name', 'path', 'created_datetime'];

Image.fromRow = function (row) {
  const array = [];
  for (const field of Image.fields) {
    array.push(row[field]);
  }
  return new Image(...array);
};

module.exports = Image;
