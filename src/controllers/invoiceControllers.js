import { paymentModel } from '../models/invoiceModel.js';

export const getPayment = async (req, res) => {
    try {
        const method = await paymentModel.getMethodModel();
        res.json(method);
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ message: 'Error fetching bills' });
    }
};

export const getBills = async (req, res) => {
    try {
        const bills = await paymentModel.getBillsModel();
        res.json(bills);
    } catch (error) {
        console.error('Error fetching bills:', error);
        res.status(500).json({ message: 'Error fetching bills' });
    }
};

export const getBill = async (req, res) => {
    const { id } = req.params;
    try {
        const bill = await paymentModel.getBillModel(id);
        if (bill.length === 0) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json(bill);
    } catch (error) {
        console.error('Error fetching bill:', error);
        res.status(500).json({ message: 'Error fetching bill' });
    }
};

export const createBill = async (req, res) => {
    const { order_id, payment_date, payment_method_id, status, transportation_cost, material_cost, total_cost_of_the_trip } = req.body;

    if (!order_id || !payment_date || !payment_method_id || !status || transportation_cost === undefined || material_cost === undefined || total_cost_of_the_trip === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newBill = await paymentModel.createBillModel({
            order_id,
            payment_date,
            payment_method_id,
            status,
            transportation_cost,
            material_cost,
            total_cost_of_the_trip
        });
        res.status(201).json(newBill);
    } catch (error) {
        console.error('Error creating bill:', error);
        res.status(500).json({ message: 'Error creating bill' });
    }
};

export const updateBill = async (req, res) => {
    const { id } = req.params;
    const { order_id, payment_date, payment_method_id, status, transportation_cost, material_cost, total_cost_of_the_trip } = req.body;
    try {
        const updatedBill = await paymentModel.updateBillModel(id, { order_id, payment_date, payment_method_id, status, transportation_cost, material_cost, total_cost_of_the_trip });
        if (!updatedBill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json(updatedBill);
    } catch (error) {
        console.error('Error updating bill:', error);
        res.status(500).json({ message: 'Error updating bill' });
    }
};

export const deleteBill = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBill = await paymentModel.deleteBillModel(id);
        if (deletedBill.length === 0) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json({ message: 'Bill deleted successfully' });
    } catch (error) {
        console.error('Error deleting bill:', error);
        res.status(500).json({ message: 'Error deleting bill' });
    }
};

