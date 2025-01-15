import jwt from 'jsonwebtoken';
import { userModel } from '../models/passwordModel.js';
import bcrypt from "bcryptjs";
import { createAccesToken } from '../token.js';

export const recover = async (req, res) => {
    const { dni, phone, email, username } = req.body;

    try {
        const user = await userModel.findUserByCredentials({ dni, phone, email, username });
        if (!user) {
            return res.status(404).send({ message: 'User  not found' });
        }


        const token = await createAccesToken({ userId: user.id });
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await userModel.storeResetToken(user.id, token, expiresAt);

        res.status(200).send({
            message: 'Generated token to reset password',
            token
        });
    } catch (error) {
        console.error("Error in recover:", error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

export const resetpassword = async (req, res) => {
    const { newPassword } = req.body;
    const { token } = req.params;

    try {

        const tokenData = await userModel.findToken(token);
        if (!tokenData) {
            return res.status(400).send({ message: 'Invalid or expired token' });
        }


        const decoded = jwt.verify(token, process.env.PALABRASECRETA);
        const userId = decoded.userId;


        const hashedPassword = await bcrypt.hash(newPassword, 10);


        const updatedUser = await userModel.updatePassword(userId, hashedPassword);
        if (!updatedUser) {
            return res.status(404).send({ message: 'User  not found' });
        }


        await userModel.deleteToken(token);

        res.status(200).send({
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error("Error in resetpassword:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).send({ message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(400).send({ message: 'Token expired' });
        }
        res.status(500).send({ message: 'Internal server error' });
    }
};