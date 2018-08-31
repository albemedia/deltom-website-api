const express = require('express');
const middlewares = require('../middlewares/index');

const router = express.Router();
const controllers = require('../controllers/api');

router.get('/', (req, res) => {
  res.send('API Send');
});

router.get('/products', middlewares.getCategories, controllers.ProductController.show);

module.exports = router;
