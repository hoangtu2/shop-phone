const express = require('express');
const { createProduct, getALlProduct, updateProduct, getOneProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();
  router.post('/create-product', createProduct)
  router.get('/products', getALlProduct)
  router.get('/:id', getOneProduct);
  router.put('/:id', updateProduct);
  router.delete('/:id', deleteProduct)
module.exports = router