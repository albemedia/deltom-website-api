const Product = require('../../models/Product');

class ProductController {
  show(req, res) {
    const arr = [];
    const cat = {};
    Product.find()
      .select('_id name category')
      .then((products) => {
        req.categories.forEach((category) => {
          arr.push(
            (cat[category.name.toLowerCase()] = products.filter(
              product => product.category.toString() === category.id,
            )),
          );
        });
        res.send(arr);
      });

    return this;
  }
}

module.exports = new ProductController();
