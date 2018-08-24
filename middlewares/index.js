const Image = require('../models/Image');

const middlewares = {
  getAllImages: (req, res, next) => {
    Image.find()
      .then((images) => {
        req.images = images;
        next();
      })
      .catch((error) => {
        res.send(error.message);
      });
  },
};

module.exports = middlewares;
