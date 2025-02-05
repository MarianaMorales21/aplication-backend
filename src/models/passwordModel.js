import { db } from '../database/connection.database.js';
import bcrypt from 'bcrypt';

const getUserByEmailModel = async (email) => {
    const query = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const getUserByIdModel = async (id) => {
    const query = {
        text: `SELECT * FROM users WHERE id = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const resetUserPasswordModel = async (email, newPassword) => {
    if (!email || !newPassword) {
        throw new Error('Email y nueva contraseña son requeridos');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = {
        text: `UPDATE users SET password = $1 WHERE email = $2 RETURNING *`,
        values: [hashedPassword, email]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const getResetTokenModel = async (token) => {
    const query = {
        text: `SELECT * FROM password_reset_tokens WHERE reset_token = $1`,
        values: [token]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const createResetTokenModel = async (userId, resetToken) => {
    if (!userId || !resetToken) {
        throw new Error('User  ID y resetToken son requeridos');
    }
    const query = {
        text: `INSERT INTO password_reset_tokens (user_id, reset_token) VALUES ($1, $2) RETURNING *`,
        values: [userId, resetToken]
    };
    const { rows } = await db.query(query);
    return rows[0];
};

const deleteResetTokenModel = async (token) => {
    if (!token) {
        throw new Error('Token es requerido');
    }
    const query = {
        text: `DELETE FROM password_reset_tokens WHERE reset_token = $1`,
        values: [token]
    };
    await db.query(query);
};

export const passwordModel = {
    getUserByEmailModel,
    getUserByIdModel,
    resetUserPasswordModel,
    getResetTokenModel,
    createResetTokenModel,
    deleteResetTokenModel,
};