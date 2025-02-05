import { db } from '../database/connection.database.js';

const getMethodModel = async () => {
    const query = {
        text: `SELECT * FROM payment_method`,
        values: []
    };
    const { rows } = await db.query(query);
    return rows;
};


const getBillsModel = async () => {
    const query = {
        text: `SELECT * FROM bills`,
        values: []
    };
    const { rows } = await db.query(query);
    return rows;
};

const getBillModel = async (id) => {
    const query = {
        text: `SELECT * FROM bills WHERE id = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const createBillModel = async ({ order_id, payment_date, payment_method_id, status, transportation_cost, material_cost, total_cost_of_the_trip }) => {
    const query = {
        text: `
        INSERT INTO bills (order_id, payment_date, payment_method_id, status, transportation_cost, material_cost, total_cost_of_the_trip) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
        values: [order_id, payment_date, payment_method_id, status, transportation_cost, material_cost, total_cost_of_the_trip]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const updateBillModel = async (id, { order_id, payment_date, payment_method_id, status, transportation_cost, material_cost, total_cost_of_the_trip }) => {
    const query = {
        text: `
        UPDATE bills 
        SET order_id = $1, payment_date = $2, payment_method_id = $3, status = $4, transportation_cost = $5, material_cost = $6, total_cost_of_the_trip = $7 
        WHERE id = $8 
        RETURNING *`,
        values: [order_id, payment_date, payment_method_id, status, transportation_cost, material_cost, total_cost_of_the_trip, id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const deleteBillModel = async (id) => {
    const query = {
        text: `DELETE FROM bills WHERE id = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

export const paymentModel = {
    getBillsModel,
    getBillModel,
    createBillModel,
    updateBillModel,
    deleteBillModel,
    getMethodModel
};