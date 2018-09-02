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
router.get(
  '/website/highlights/edit/:Id',
  middlewares.getAllImages,
  WebsiteController.highlights.edit,
);
router.get('/website/highlights', WebsiteController.highlights.show);
router.get('/website/highlights/delete/:Id', WebsiteController.highlights.delete);
router.post('/website/highlights', WebsiteController.highlights.store);
router.post('/website/highlights/update/:Id', WebsiteController.highlights.update);

router.get('/website/company', WebsiteController.company.edit);
router.post('/website/company', WebsiteController.company.update);

router.get('/website/about', WebsiteController.about.edit);
router.post('/website/about', WebsiteController.about.update);

router.get(
  '/website/jumbotron/create',
  middlewares.getAllImages,
  WebsiteController.jumbotron.create,
);
router.get('/website/jumbotron', WebsiteController.jumbotron.show);
router.get('/website/jumbotron/delete/:Id', WebsiteController.jumbotron.delete);
router.post('/website/jumbotron', WebsiteController.jumbotron.store);

module.exports = router;
