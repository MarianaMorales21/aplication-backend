import { pool } from '../db.js';


const userExists = async (username) => {
    const { rowCount } = await pool.query(
        "SELECT 1 FROM users WHERE username = $1",
        [username]
    );
    return rowCount > 0;
};

const createUser = async (userData) => {
    const { username, name, email, password, phone, role, address, dni } = userData;
    const { rows } = await pool.query(
        `INSERT INTO users (username, name, email, password, phone, role, status, address, dni) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
         RETURNING *`,
        [
            username,
            name,
            email,
            password,
            phone,
            role,
            "Active",
            address,
            dni
        ]
    );
    return rows[0];
};

const getUsername = async (username) => {
    const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );
    return rows[0];
};

const logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const auth = {
    userExists,
    createUser,
    getUsername,
    logout,
};
