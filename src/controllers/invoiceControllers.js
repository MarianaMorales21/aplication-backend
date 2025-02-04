import { paymentModel } from '../models/invoiceModel.js';

// Métodos de pago
export const getPaymentMethods = async (req, res) => {
    try {
        const paymentMethods = await paymentModel.getPaymentMethodsModel();
        res.json(paymentMethods);
    } catch (error) {
        console.error('Error fetching payment methods:', error);
        res.status(500).json({ message: 'Error fetching payment methods' });
    }
};

// Facturas
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
    const { order_id, payment_date, payment_method_id, amount_to_pay, status } = req.body;
    try {
        const newBill = await paymentModel.createBillModel({ order_id, payment_date, payment_method_id, amount_to_pay, status });
        res.status(201).json(newBill);
    } catch (error) {
        console.error('Error creating bill:', error);
        res.status(500).json({ message: 'Error creating bill' });
    }
};

export const updateBill = async (req, res) => {
    const { id } = req.params;
    const { order_id, payment_date, payment_method_id, amount_to_pay, status } = req.body;
    try {
        const updatedBill = await paymentModel.updateBillModel(id, { order_id, payment_date, payment_method_id, amount_to_pay, status });
        if (updatedBill.length === 0) {
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

// Detalles de facturas
export const getInvoiceDetails = async (req, res) => {
    try {
        const invoiceDetails = await paymentModel.getInvoiceDetailsModel();
        res.json(invoiceDetails);
    } catch (error) {
        console.error('Error fetching invoice details:', error);
        res.status(500).json({ message: 'Error fetching invoice details' });
    }
};

export const getInvoiceDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const invoiceDetail = await paymentModel.getInvoiceDetailModel(id);
        if (invoiceDetail.length === 0) {
            return res.status(404).json({ message: 'Invoice detail not found' });
        }
        res.json(invoiceDetail);
    } catch (error) {
        console.error('Error fetching invoice detail:', error);
        res.status(500).json({ message: 'Error fetching invoice detail' });
    }
};

export const createInvoiceDetail = async (req, res) => {
    const { bill_id, details_order_id, transportation_cost, material_cost, total_cost_of_the_trip } = req.body;
    try {
        const newInvoiceDetail = await paymentModel.createInvoiceDetailModel({ bill_id, details_order_id, transportation_cost, material_cost, total_cost_of_the_trip });
        res.status(201).json(newInvoiceDetail);
    } catch (error) {
        console.error('Error creating invoice detail:', error);
        res.status(500).json({ message: 'Error creating invoice detail' });
    }
};

export const updateInvoiceDetail = async (req, res) => {
    const { id } = req.params;
    const { bill_id, details_order_id, transportation_cost, material_cost, total_cost_of_the_trip } = req.body;
    try {
        const updatedInvoiceDetail = await paymentModel.updateInvoiceDetailModel(id, { bill_id, details_order_id, transportation_cost, material_cost, total_cost_of_the_trip });
        if (updatedInvoiceDetail.length === 0) {
            return res.status(404).json({ message: 'Invoice detail not found' });
        }
        res.json(updatedInvoiceDetail);
    } catch (error) {
        console.error('Error updating invoice detail:', error);
        res.status(500).json({ message: 'Error updating invoice detail' });
    }
};

export const deleteInvoiceDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedInvoiceDetail = await paymentModel.deleteInvoiceDetailModel(id);
        if (deletedInvoiceDetail.length === 0) {
            return res.status(404).json({ message: 'Invoice detail not found' });
        }
        res.json({ message: 'Invoice detail deleted successfully' });
    } catch (error) {
        console.error('Error deleting invoice detail:', error);
        res.status(500).json({ message: 'Error deleting invoice detail' });
    }
};