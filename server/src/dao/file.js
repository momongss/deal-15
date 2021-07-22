const Image = require('@src/model/image');
const { insertAsync } = require('@src/dao/db');

async function addImageAsync(image) {
  await insertAsync(
    Image.table,
    ['user_id', 'upload_name', 'path'],
    [image.userId, image.uploadName, image.path],
  );
}

module.exports = {
  addImageAsync,
};
