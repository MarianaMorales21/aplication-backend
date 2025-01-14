import jwt from 'jsonwebtoken';
import { auth } from '../models/authModel.js';

export const register = async (req, res) => {
    const { password, username, email, name, phone, role, address, dni } = req.body;

    try {
        if (await auth.userExists(username)) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser = await auth.createUser({ username, name, email, password, phone, role, address, dni });

        jwt.sign(
            { id: newUser.id },
            'secret123',
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    console.error("Error creating token:", err);
                    return res.status(500).json({ message: "Error creating token" });
                }

                res.cookie('token', token);
                res.status(201).json({ token });
            }
        );
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await auth.getUsername(username);
        if (!existingUser) {
            console.log("User  not found:", username);
            return res.status(400).json({ message: "Invalid username" });
        }

        if (password !== existingUser.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        jwt.sign(
            { id: existingUser.id },
            'secret123',
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    console.error("Error creating token:", err);
                    return res.status(500).json({ message: "Error creating token" });
                }

                res.cookie('token', token);
                res.status(200).json({
                    id: existingUser.id,
                    username: existingUser.username,
                    name: existingUser.name,
                    email: existingUser.email,
                    phone: existingUser.phone,
                    role: existingUser.role,
                    status: existingUser.status,
                    address: existingUser.address,
                });
            }
        );
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//agregar lista negra 
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
