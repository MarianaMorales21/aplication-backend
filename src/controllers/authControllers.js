/*import jwt from 'jsonwebtoken';
import { auth } from '../models/authModel.js';
import bcrypt from 'bcryptjs';

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

        jwt.sign(
            { username: newUser.username },
            'secret123',
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    console.error("Error creating token:", err);
                    return res.status(500).json({ message: "Error creating token" });
                }

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
        const existingUser = await auth.getUsernameModel(username);
        if (!existingUser) {
            console.log("User  not found:", username);
            return res.status(400).json({ message: "Invalid username" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        jwt.sign(
            { username: existingUser.username },
            'secret123',
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    console.error("Error creating token:", err);
                    return res.status(500).json({ message: "Error creating token" });
                }

                res.status(200).json({
                    id: existingUser.id,
                    username: existingUser.username,
                    name: existingUser.name,
                    email: existingUser.email,
                    phone: existingUser.phone,
                    role: existingUser.role,
                    status: existingUser.status,
                    address: existingUser.address,
                    token,
                });
            }
        );
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const profile = async (req, res) => {
    try {
        const existingUser = await auth.getUsernameModel(req.username);
        console.log(existingUser)
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
            msg: 'Error server'
        });
    }
};
*/

import { createAccesToken } from "../token.js";
import bcrypt from "bcryptjs";
import { auth } from "../models/authModel.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await auth.getUsernameModel(username);

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = await createAccesToken({ username: user.username })

        return res.json({ token, user })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    try {
        const { username, name, email, password, phone, role, address, dni } = req.body;

        if (await auth.userExistsModel(username)) {
            return res.status(400).json({ message: "Username already exists" });
        }


        const hash = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, hash);

        const newUser = await auth.createUserModel({ username, name, email, password: hashedPassword, phone, role, address, dni })

        const token = await createAccesToken({ username: newUser.username })

        return res.status(201).json({ newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

export const profile = async (req, res) => {
    try {
        const user = await auth.getUsernameModel(req.username)

        return res.json({ ok: true, msg: user })

    } catch (error) {

    }
}

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.json({ message: "Logged out successfully" })
}


