const Category = require('../models/Category');
const Image = require('../models/Image');
const Product = require('../models/Product');

class CategoryController {
  create(req, res) {
    Image.find().then((images) => {
      res.render('categories-create', {
        images,
        scriptFile: 'imageSelect',
        currentPage: 'products',
      });
    });
    return this;
  }

  edit(req, res) {
    const images = Image.find().then(imgs => imgs);
    const categories = Category.findOne({ _id: req.params.Id })
      .populate({
        path: 'representativeImage',
        select: 'url description filename -_id',
      })
      .then(cats => cats);
    Promise.all([images, categories]).then((result) => {
      const fields = {
        id: result[1].id,
        name: result[1].name,
        representativeImage: result[1].representativeImage,
        filename:
          result[1].representativeImage !== null ? result[1].representativeImage.filename : '',
      };
      res.render('categories-create', {
        images: result[0],
        fields,
        scriptFile: 'imageSelect',
        currentPage: 'products',
      });
    });
    return this;
  }

  update(req, res) {
    Category.findOneAndUpdate(
      { _id: req.params.Id },
      { name: req.body.name, representativeImage: req.body.imagePicked },
    )
      .then(() => {
        res.redirect('/admin/categories');
      })
      .catch((error) => {
        res.send(error.message);
      });
    return this;
  }

  store(req, res) {
    Category.create({
      name: req.body.name,
      representativeImage: req.body.imagePicked,
    }).then(() => {
      res.redirect('/admin/categories/');
    });
    return this;
  }

  show(req, res) {
    Category.find()
      .populate({
        path: 'representativeImage',
        select: 'url description filename -_id',
      })
      .exec((error, categories) => {
        if (error) {
          res.send(error.message);
        } else {
          res.render('categories', { categories, currentPage: 'products' });
        }
      });
    return this;
  }

  products(req, res) {
    Product.find({ category: req.params.Id })
      .populate([
        { path: 'category', select: 'name -_id' },
        { path: 'picture', select: 'url description filename -_id' },
      ])
      .then((products) => {
        res.render('products', { products, currentPage: 'products' });
      });
    return this;
  }

  delete(req, res) {
    Product.find({ category: req.params.Id })
      .then((product) => {
        if (product.length > 0) {
          throw Error('Productos dependen de esta categoria.');
        } else {
          Category.findOneAndRemove({ _id: req.params.Id })
            .then(() => {
              res.redirect('/admin/categories');
            })
            .catch((error) => {
              res.send(error.message);
            });
        }
      })
      .catch((error) => {
        res.send(error.message);
      });
    return this;
  }
}

module.exports = new CategoryController();
