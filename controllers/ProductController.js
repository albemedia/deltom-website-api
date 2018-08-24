const Product = require('../models/Product');
const Image = require('../models/Image');
const Category = require('../models/Category');

class ProductController {
  create(req, res) {
    const images = Image.find().then(imgs => imgs);
    const categories = Category.find()
      .sort('name')
      .then(cats => cats);
    Promise.all([images, categories])
      .then((result) => {
        res.render('products-create', {
          images: result[0],
          categories: result[1],
          scriptFile: 'imageSelect',
          currentPage: 'products',
        });
      })
      .catch((error) => {
        res.send(error.message);
      });
    return this;
  }

  edit(req, res) {
    const images = Image.find().then(imgs => imgs);
    const categories = Category.find()
      .sort('name')
      .then(cats => cats);
    const product = Product.findOne({ _id: req.params.Id })
      .populate([
        { path: 'category', select: 'name -_id' },
        { path: 'picture', select: 'url description filename -_id' },
      ])
      .then(products => products);
    Promise.all([images, categories, product]).then((result) => {
      const fields = {
        id: result[2].id,
        name: result[2].name,
        description: result[2].description,
        category: result[2].category,
        picture: result[2].picture,
        filename: result[2].picture !== null ? result[2].picture.filename : '',
      };
      res.render('products-create', {
        images: result[0],
        categories: result[1],
        fields,
        scriptFile: 'imageSelect',
        currentPage: 'products',
      });
    });
    return this;
  }

  update(req, res) {
    Product.findOneAndUpdate(
      { _id: req.params.Id },
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        picture: req.body.imagePicked,
      },
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
    Product.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      picture: req.body.imagePicked,
    }).then(() => {
      res.redirect('/admin/categories');
    });
    return this;
  }

  show(req, res) {
    Product.find()
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
    Product.findOneAndRemove({ _id: req.params.Id })
      .then(() => {
        res.redirect('/admin/categories');
      })
      .catch((error) => {
        res.send(error);
      });
    return this;
  }
}

module.exports = new ProductController();
