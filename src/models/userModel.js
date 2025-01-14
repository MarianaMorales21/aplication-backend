import { db } from '../database/connection.database.js'
const getUsersModel = async () => {
    const query = {
        text: `
       SELECT * FROM users`,
        values: []
    }
    const { rows } = await db.query(query)
    return rows
}


const getUserModel = async ({ id }) => {
    const query = {
        text: `
       SELECT * FROM users WHERE ID = $1`,
        values: [id]
    }
    const { rows } = await db.query(query)
    return rows
}


const createUserModel = async ({ id, name, username, email, role, status, password, address, phone, dni }) => {
    const query = {
        text: `
        INSERT INTO users (id, name, username,email,role, status, password, address, phone, dni ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
        values: [id, name, username, email, role, status, password, address, phone, dni]
    }
    const { rows } = await db.query(query)
    return rows
}

const updateUserModel = async (id, { name, username, email, role, status, password, address, phone, dni }) => {
    const query = {
        text: `
        UPDATE users SET name=$1, username=$2,email=$3,role=$4, status=$5, password=$6, address=$7, phone=$8, dni=$9  WHERE id = $10 RETURNING *`,
        values: [name, username, email, role, status, password, address, phone, dni, id]
    }
    const { rows } = await db.query(query)
    return rows
}

const deleteUserModel = async ({ id }) => {
    const query = {
        text: `
        DELETE FROM users WHERE id = $1 RETURNING *`,
        values: [id]
    }
    const { rows } = await db.query(query)
    return rows
}

export const userModel = {
    createUserModel,
    updateUserModel,
    deleteUserModel,
    getUsersModel,
    getUserModel,
}