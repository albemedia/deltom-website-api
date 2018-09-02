const Image = require('../models/Image');
const Category = require('../models/Category');

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
  getCategories: (req, res, next) => {
    Category.find()
      .populate({ path: 'representativeImage', select: 'url filename' })
      .then((categories) => {
        req.categories = categories;
        next();
      })
      .catch((error) => {
        res.send(error.message);
      });
  },
  requireAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  },
};

module.exports = middlewares;
