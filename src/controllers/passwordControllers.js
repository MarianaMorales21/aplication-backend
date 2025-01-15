// controllers/authController.js
import jwt from 'jsonwebtoken';
import { userModel } from '../models/passwordModel.js'; // Asegúrate de que este modelo esté correctamente implementado
import bcrypt from "bcryptjs";

export const recover = async (req, res) => {
    const { dni, phone, email, username } = req.body;

    // Buscar el usuario por sus credenciales
    const user = await userModel.findUserByCredentials({ dni, phone, email, username });
    if (!user) {
        return res.status(404).send({ message: 'User  not found' });
    }

    // Generar un token para el restablecimiento de contraseña
    const token = jwt.sign({ userId: user.id }, process.env.PALABRASECRETA, { expiresIn: '10m' });

    // Devolver el token al cliente
    res.status(200).send({
        message: 'Generated token to reset password',
        token
    });
};

export const resetpassword = async (req, res) => {
    const { newPassword } = req.body;
    const { token } = req.params;

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.PALABRASECRETA);
        const userId = decoded.userId;

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario
        const updatedUser = await userModel.updatePassword(userId, hashedPassword);
        if (!updatedUser) {
            return res.status(404).send({ message: 'User  not found' });
        }

        // Opcional: Aquí podrías eliminar el token de la base de datos si lo estás almacenando

        res.status(200).send({
            message: 'Password updated successfully'
        });
    } catch (error) {
        // Manejo de errores más específico
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).send({ message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(400).send({ message: 'Token expired' });
        }
        res.status(500).send({ message: 'Internal server error' });
    }
};