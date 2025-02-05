import { db } from '../database/connection.database.js';

const getOrdersModel = async () => {
    const query = {
        text: `
        SELECT * 
        FROM "order"`,
        values: []
    };
    const { rows } = await db.query(query);
    return rows;
};

const getOrderModel = async ({ id }) => {
    const query = {
        text: `
        SELECT * 
        FROM "order" 
        WHERE id = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};


const createOrderModel = async ({ order_date, total_delivery_date, status, client_id }) => {
    const query = {
        text: `
        INSERT INTO "order" ( order_date, total_delivery_date, status, client_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
        values: [order_date, total_delivery_date, status, client_id]
    };
    const { rows } = await db.query(query);
    return rows;
};


const createOrderDetailModel = async ({ order_id, material_id, quantity_of_material, delivery_date, status, truck_id, trip_duration, distancia_to_travel, destination_address }) => {
    const query = {
        text: `
        INSERT INTO order_details (order_id, material_id, quantity_of_material, delivery_date, status, truck_id, trip_duration, distancia_to_travel, destination_address) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
        values: [order_id, material_id, quantity_of_material, delivery_date, status, truck_id, trip_duration, distancia_to_travel, destination_address]
    };
    const { rows } = await db.query(query);
    return rows;
}

const updateOrderModel = async (id, { order_date, total_delivery_date, status, client_id }) => {
    if (!id || !order_date || !total_delivery_date || !status || !client_id) {
        throw new Error('Faltan parámetros de entrada');
    }

    try {
        const query = {
            text: `
            UPDATE "order" 
            SET order_date = $1, total_delivery_date = $2, status = $3, client_id = $4 
            WHERE id = $5 
            RETURNING *`,
            values: [order_date, total_delivery_date, status, client_id, id]
        };
        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        throw new Error(`Error al actualizar la orden: ${error.message}`);
    }
};
const updateOrderDetailModel = async (id, { order_id, material_id, quantity_of_material, delivery_date, status, truck_id, trip_duration, distancia_to_travel, destination_address }) => {
    const query = {
        text: `
        UPDATE order_details 
        SET order_id = $1, material_id = $2, quantity_of_material = $3, delivery_date = $4, status = $5, truck_id = $6, trip_duration = $7, distancia_to_travel = $8, destination_address = $9 
        WHERE id = $10 
        RETURNING *`,
        values: [order_id, material_id, quantity_of_material, delivery_date, status, truck_id, trip_duration, distancia_to_travel, destination_address, id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const deleteOrderModel = async ({ id }) => {
    const query = {
        text: `DELETE FROM "order" WHERE id = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const deleteOrderDetailModel = async ({ id }) => {
    const query = {
        text: `DELETE FROM order_details WHERE id = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const getOrderDetailsModel = async () => {
    const query = {
        text: `SELECT * FROM order_details`,
        values: []
    };
    const { rows } = await db.query(query);
    return rows;
};

const getOrderDetailModel = async ({ id }) => {
    const query = {
        text: `
        SELECT od.* 
        FROM order_details od
        WHERE od.order_id = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

export const orderModel = {
    getOrdersModel,
    getOrderModel,
    createOrderModel,
    createOrderDetailModel,
    updateOrderModel,
    updateOrderDetailModel,
    deleteOrderModel,
    deleteOrderDetailModel,
    getOrderDetailModel,
    getOrderDetailsModel,
};