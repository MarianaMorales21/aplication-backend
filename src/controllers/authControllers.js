import { auth } from '../models/authModel.js';
import bcrypt from 'bcryptjs';
import { createAccesToken } from '../token.js';

export const register = async (req, res) => {
    const { password, username, email, name, phone, role, address, dni } = req.body;

    try {
        if (await auth.userExistsModel(username)) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await auth.createUserModel({
            username,
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            address,
            dni
        });

        const token = await createAccesToken({ username: newUser.username });


        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({ token });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body; // Asegúrate de que estás extrayendo correctamente los datos del cuerpo

    try {
        const existingUser = await auth.getUsernameModel(username);
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid username" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generar y devolver el token
        const token = await createAccesToken({ username: existingUser.username });
        res.status(200).json({ token, user: existingUser });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const profile = async (req, res) => {
    try {
        const existingUser = await auth.getUsernameModel(req.username);

        if (!existingUser) {
            return res.status(404).json({ message: "User  not found" });
        }

        return res.json({
            id: existingUser.id,
            username: existingUser.username,
            name: existingUser.name,
            email: existingUser.email,
            phone: existingUser.phone,
            role: existingUser.role,
            status: existingUser.status,
            address: existingUser.address,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Server error'
        });
    }
};

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No user is logged in" });
        }

        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/*
{
    "username": "adrian123",
    "password": "mariana123"
}
*/