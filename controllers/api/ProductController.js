const Product = require('../../models/Product');

class ProductController {
  show(req, res) {
    console.log('Api Requested!');
    Product.find()
      .populate({ path: 'category', select: '_id name' })
      .populate({ path: 'picture', select: 'url filename -_id' })
      .then((products) => {
        res.send({ categories: req.categories, products });
      });

    return this;
  }
}

module.exports = new ProductController();
