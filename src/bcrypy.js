import bcrypt from "bcryptjs";
import { db } from './database/connection.database.js';

const updatePasswords = async () => {
    try {
        const users = await db.query('SELECT id, password FROM users WHERE password IS NOT NULL');

        for (const user of users.rows) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);

            await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, user.id]);
            console.log(`Password for user ID ${user.id} updated successfully.`);
        }

        console.log('All passwords have been updated.');
    } catch (error) {
        console.error('Error updating passwords:', error);
    } finally {
        await db.end();
    }
};

updatePasswords();



/*
import express from 'express';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


app.post('/request-reset', async (req, res) => {
    const { phone, fechanac } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE phone = $1 AND fechanac = $2', [phone, fechanac]);

    if (user.rows.length === 0) {
        return res.status(400).send('No existe un usuario con esos datos.');
    }

    const token = crypto.randomBytes(20).toString('hex');

    const expires = new Date(Date.now() + 3600000);
    await pool.query('UPDATE users SET reset_password_token = $1, reset_password_expires = $2 WHERE id_user = $3', [token, expires, user.rows[0].id_user]);

    res.status(200).send({ message: 'Token generado para restablecer la contraseña.', token });
});

app.post('/reset/:token', async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    const user = await pool.query('SELECT * FROM users WHERE reset_password_token = $1 AND reset_password_expires > NOW()', [token]);

    if (user.rows.length === 0) {
        return res.status(400).send('El token de restablecimiento de contraseña es inválido o ha expirado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password = $1, reset_password_token = NULL, reset_password_expires = NULL WHERE reset_password_token = $2', [hashedPassword, token]);

    res.status(200).send('La contraseña ha sido restablecida exitosamente.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});*/