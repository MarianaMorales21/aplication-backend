import { db } from '../database/connection.database.js';

const userExistsModel = async (username) => {
    const query = {
        text: `SELECT * FROM users WHERE username = $1`,
        values: [username]
    };
    const { rowCount } = await db.query(query);
    return rowCount > 0;
};

const createUserModel = async ({ username, name, email, password, phone, role, address, dni }) => {
    const query = {
        text: `
        INSERT INTO users (username, name, email, password, phone, role, status, address, dni) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *`,
        values: [username, name, email, password, phone, role, "Active", address, dni]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const getUsernameModel = async (username) => {
    const query = {
        text: `SELECT * FROM users WHERE username = $1`,
        values: [username]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

export const auth = {
    userExistsModel,
    createUserModel,
    getUsernameModel,
};

