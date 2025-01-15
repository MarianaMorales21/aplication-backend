import { db } from '../database/connection.database.js';
import bcrypt from 'bcryptjs';

const findUserByCredentials = async ({ dni, phone, email, username }) => {
    const query = {
        text: `SELECT * FROM users WHERE dni = $1 AND phone = $2 AND email = $3 AND username = $4`,
        values: [dni, phone, email, username]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const updatePassword = async (id, newPassword) => {
    const query = {
        text: `UPDATE users SET password = $1 WHERE id = $2 RETURNING *`,
        values: [newPassword, id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const storeResetToken = async (userId, token, expiresAt) => {
    const query = {
        text: `INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING *`,
        values: [userId, token, expiresAt]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const findToken = async (token) => {
    const query = {
        text: `SELECT * FROM password_reset_tokens WHERE token = $1 AND expires_at > CURRENT_TIMESTAMP`,
        values: [token]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const deleteToken = async (token) => {
    const query = {
        text: `DELETE FROM password_reset_tokens WHERE token = $1`,
        values: [token]
    };
    await db.query(query);
};

export const userModel = {
    findUserByCredentials,
    updatePassword,
    storeResetToken,
    findToken,
    deleteToken,
};