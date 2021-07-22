const Image = require('@src/model/image');
const fileDao = require('@src/dao/file');

async function addImageAsync(userId, uploadName, path) {
  const image = new Image(null, userId, uploadName, path, null);
  await fileDao.addImageAsync(image);
}

module.exports = {
  addImageAsync,
};
