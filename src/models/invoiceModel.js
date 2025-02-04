import { db } from '../database/connection.database.js';

const getPaymentMethodsModel = async () => {
    const query = {
        text: `SELECT * FROM payment_method`,
        values: []
    };
    const { rows } = await db.query(query);
    return rows;
};

const getBillsModel = async () => {
    const query = {
        text: `SELECT * FROM bill`,
        values: []
    };
    const { rows } = await db.query(query);
    return rows;
};

const getBillModel = async (id) => {
    const query = {
        text: `SELECT * FROM bill WHERE id = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const createBillModel = async ({ order_id, payment_date, payment_method_id, amount_to_pay, status }) => {
    const query = {
        text: `
        INSERT INTO bill (order_id, payment_date, payment_method_id, amount_to_pay, status) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`,
        values: [order_id, payment_date, payment_method_id, amount_to_pay, status]
    };
    const { rows } = await db.query(query);
    return rows;
};

const updateBillModel = async (id, { order_id, payment_date, payment_method_id, amount_to_pay, status }) => {
    const query = {
        text: `
        UPDATE bill 
        SET order_id = $1, payment_date = $2, payment_method_id = $3, amount_to_pay = $4, status = $5 
        WHERE id = $6 
        RETURNING *`,
        values: [order_id, payment_date, payment_method_id, amount_to_pay, status, id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const deleteBillModel = async (id) => {
    const query = {
        text: `DELETE FROM bill WHERE id = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const getInvoiceDetailsModel = async () => {
    const query = {
        text: `SELECT * FROM invoice_details`,
        values: []
    };
    const { rows } = await db.query(query);
    return rows;
};

const getInvoiceDetailModel = async (id) => {
    const query = {
        text: `SELECT * FROM invoice_details WHERE id = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const createInvoiceDetailModel = async ({ bill_id, details_order_id, transportation_cost, material_cost, total_cost_of_the_trip }) => {
    const query = {
        text: `
        INSERT INTO invoice_details (bill_id, details_order_id, transportation_cost, material_cost, total_cost_of_the_trip) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *`,
        values: [bill_id, details_order_id, transportation_cost, material_cost, total_cost_of_the_trip]
    };
    const { rows } = await db.query(query);
    return rows;
};

const updateInvoiceDetailModel = async (id, { bill_id, details_order_id, transportation_cost, material_cost, total_cost_of_the_trip }) => {
    const query = {
        text: `
        UPDATE invoice_details 
        SET bill_id = $1, details_order_id = $2, transportation_cost = $3, material_cost = $4, total_cost_of_the_trip = $5 
        WHERE id = $6 
        RETURNING *`,
        values: [bill_id, details_order_id, transportation_cost, material_cost, total_cost_of_the_trip, id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const deleteInvoiceDetailModel = async (id) => {
    const query = {
        text: `DELETE FROM invoice_details WHERE id = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

export const paymentModel = {
    getPaymentMethodsModel,
    getBillsModel,
    getBillModel,
    createBillModel,
    updateBillModel,
    deleteBillModel,
    getInvoiceDetailsModel,
    getInvoiceDetailModel,
    createInvoiceDetailModel,
    updateInvoiceDetailModel,
    deleteInvoiceDetailModel
};