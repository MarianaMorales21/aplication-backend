import { orderModel } from "../models/orderModel.js";

export const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.getOrdersModel();
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

export const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await orderModel.getOrderModel({ id });
        if (order.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Error fetching order' });
    }
};

export const getOrderDetails = async (req, res) => {
    try {
        const orderDetails = await orderModel.getOrderDetailsModel();
        res.json(orderDetails);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Error fetching order details' });
    }
};

export const getOrderDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const orderDetail = await orderModel.getOrderDetailModel({ id });
        if (orderDetail.length === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        res.json(orderDetail);
    } catch (error) {
        console.error('Error fetching order detail:', error);
        res.status(500).json({ message: 'Error fetching order detail' });
    }
};

export const createOrder = async (req, res) => {
    const newOrder = req.body;
    try {
        const createdOrder = await orderModel.createOrderModel(newOrder);
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

export const createOrderDetail = async (req, res) => {
    const newOrderDetail = req.body;
    try {
        const createdOrderDetail = await orderModel.createOrderDetailModel(newOrderDetail);
        res.status(201).json(createdOrderDetail);
    } catch (error) {
        console.error('Error creating order detail:', error);
        res.status(500).json({ message: 'Error creating order detail' });
    }
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedOrder = await orderModel.updateOrderModel(id, updatedData);
        if (updatedOrder.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Error updating order' });
    }
};

export const updateOrderDetail = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updatedOrderDetail = await orderModel.updateOrderDetailModel(id, updatedData);
        if (updatedOrderDetail.length === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        res.json(updatedOrderDetail);
    } catch (error) {
        console.error('Error updating order detail:', error);
        res.status(500).json({ message: 'Error updating order detail' });
    }
};


export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await orderModel.deleteOrderModel({ id });
        if (deletedOrder.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(deletedOrder);
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Error deleting order' });
    }
};

export const deleteOrderDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrderDetail = await orderModel.deleteOrderDetailModel({ id });
        if (deletedOrderDetail.length === 0) {
            return res.status(404).json({ message: 'Order detail not found' });
        }
        res.json(deletedOrderDetail);
    } catch (error) {
        console.error('Error deleting order detail:', error);
        res.status(500).json({ message: 'Error deleting order detail' });
    }
};