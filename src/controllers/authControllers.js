import { data } from '../data.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { password, username, email, name, phone, role } = req.body;

    try {
        const existingUser  = data.users.find(user => user.username === username);
        if (existingUser ) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser  = {
            id: (data.users.length + 1).toString(),
            username,
            name,
            email,
            password, 
            phone,
            role,
            status: "Active",
            address: "",
            dni: ""
        };

        data.users.push(newUser );

        jwt.sign(
            { id: newUser .id },
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
/*
register
{
    "username": "Mar",
    "password": "Mar123",
    "email": "mariana@gmail.com",
    "name": "marmar52",
    "phone": "041216117",
    "role": "driver",
    "address": "Tariba"
}
login
{
    "username": "Mar",
   "password": "Mar123"
}  
*/



export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser  = data.users.find(user => user.username === username);
        
        if (!existingUser ) {
            console.log("User  not found:", username);
            return res.status(400).json({ message: "Invalid username" });
        }

        if (password !== existingUser .password) {
            return res.status(400).json({ message: 'Error: Invalid Credentials' });
        }

        jwt.sign(
            { id: existingUser .id },
            'secret123', 
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    console.error("Error creating token:", err);
                    return res.status(500).json({ message: "Error creating token" });
                }

                res.cookie('token', token);
                res.status(200).json({
                    id: existingUser .id,
                    username: existingUser .username,
                    name: existingUser .name,
                    email: existingUser .email,
                    phone: existingUser .phone,
                    role: existingUser .role,
                    status: existingUser .status,
                    address: existingUser .address,
                });
            }
        );
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};