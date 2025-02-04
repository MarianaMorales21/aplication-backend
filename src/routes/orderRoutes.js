import express from 'express';
import {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderDetails,
    getOrderDetail,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
} from '../controllers/orderControllers.js';

const router = express.Router();

router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);
router.get('/orders/details/:id', getOrderDetail);
router.post('/orders/details', createOrderDetail);
router.put('/orders/details/:id', updateOrderDetail);
router.delete('/orders/details/:id', deleteOrderDetail);

export default router;