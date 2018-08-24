const multer = require('multer');
const path = require('path');

function uploader(maxSize = 1000000) {
  const dsOptions = {
    options: {
      destination: './public/images/',
      filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname).toLowerCase()}`);
      },
    },
  };

  const storage = multer.diskStorage(dsOptions.options);
  const upload = multer({
    storage,
    limits: typeof maxSize === 'number' ? maxSize : 1000000,
  });

  return upload;
}

module.exports = uploader;
