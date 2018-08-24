const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Send');
});

router.get('/images', (req, res) => {
  res.send('Images Handler');
});

module.exports = router;
