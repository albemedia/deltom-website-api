const Product = require('../../models/Product');

class ProductController {
  show(req, res) {
    const result = {};
    Product.find()
      .select('_id name category')
      .then((products) => {
        req.categories.forEach((category) => {
          result[category.name] = products.filter(
            product => product.category.toString() === category.id,
          );
        });
        res.send(result);
      });

    return this;
  }
}

module.exports = new ProductController();
