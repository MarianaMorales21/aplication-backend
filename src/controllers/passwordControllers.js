import { passwordModel } from '../models/passwordModel.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await passwordModel.getUserByEmailModel(email);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        await passwordModel.createResetTokenModel(user.id, resetToken);

        const resetLink = `http://localhost:3000/forgotpassword`;

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Restablecimiento de Contraseña',
            text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}, token=${resetToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.send('Se ha enviado un enlace de recuperación a tu correo electrónico.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar la solicitud.');
    }
};

export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const resetTokenData = await passwordModel.getResetTokenModel(token);
        if (!resetTokenData) {
            return res.status(400).send('Token inválido o expirado');
        }

        const user = await passwordModel.getUserByIdModel(resetTokenData.user_id);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        await passwordModel.resetUserPasswordModel(user.email, newPassword);
        await passwordModel.deleteResetTokenModel(token);

        res.send('Contraseña restablecida con éxito.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al restablecer la contraseña.');
    }
};