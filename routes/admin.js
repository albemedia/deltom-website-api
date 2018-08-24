const express = require('express');
const middlewares = require('../middlewares');

const router = express.Router();
const ImageController = require('../controllers/ImageController');
const CategoryController = require('../controllers/CategoryController');
const ProductController = require('../controllers/ProductController');
const WebsiteController = require('../controllers/WebsiteController');

router.get('/', (req, res) => {
  res.render('index', { scriptFile: 'indexAnimate', currentPage: 'home' });
});
router.get('/gallery', ImageController.showGallery);
router.get('/images/delete/:Id', ImageController.deleteImage);
router.get('/upload', ImageController.showUploadForm);
router.post('/upload', ImageController.upload);

router.get('/categories', CategoryController.show);
router.get('/categories/:Id/products', CategoryController.products);
router.get('/categories/create', CategoryController.create);
router.get('/categories/delete/:Id', CategoryController.delete);
router.get('/categories/edit/:Id', CategoryController.edit);
router.post('/categories', CategoryController.store);
router.post('/categories/update/:Id', CategoryController.update);

router.get('/products', ProductController.show);
router.get('/products/create', ProductController.create);
router.get('/products/delete/:Id', ProductController.delete);
router.get('/products/edit/:Id', ProductController.edit);
router.post('/products', ProductController.store);
router.post('/products/update/:Id', ProductController.update);

router.get(
  '/website/highlights/create',
  middlewares.getAllImages,
  WebsiteController.highlights.create,
);
router.get('/website/highlights', WebsiteController.highlights.show);
router.post('/website/highlights', WebsiteController.highlights.store);

module.exports = router;
