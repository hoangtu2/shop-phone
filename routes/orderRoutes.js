const express = require('express');
const {createOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
router.post('/', createOrder);
router.get('/', getAllOrders);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
module.exports = router;
