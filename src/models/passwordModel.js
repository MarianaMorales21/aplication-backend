// models/passwordModel.js
import { db } from '../database/connection.database.js';
import bcrypt from 'bcryptjs';

// Función para encontrar un usuario por sus credenciales
const findUserByCredentials = async ({ dni, phone, email, username }) => {
    const query = {
        text: `SELECT * FROM users WHERE dni = $1 AND phone = $2 AND email = $3 AND username = $4`,
        values: [dni, phone, email, username]
    };
    const { rows } = await db.query(query);
    return rows[0]; // Retornar el primer usuario encontrado o undefined si no hay coincidencias
};

// Función para actualizar la contraseña del usuario
const updatePassword = async (id, newPassword) => {
    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = {
        text: `UPDATE users SET password = $1 WHERE id = $2 RETURNING *`,
        values: [hashedPassword, id]
    };
    const { rows } = await db.query(query);
    return rows[0]; // Retornar el usuario actualizado o undefined si no se encontró
};

// Exportar el modelo
export const userModel = {
    findUserByCredentials,
    updatePassword,
};