import { db } from '../database/connection.database.js'

const getClientsModel = async () => {
    const query = {
        text: `
       SELECT * FROM client`,
        values: []
    }
    const { rows } = await db.query(query)
    return rows
}


const getClientModel = async ({ id }) => {
    const query = {
        text: `
       SELECT * FROM client WHERE ID = $1`,
        values: [id]
    }
    const { rows } = await db.query(query)
    return rows
}


const createClientModel = async ({ id, type, user_id }) => {
    const query = {
        text: `
        INSERT INTO client (id, type, user_id ) VALUES ($1,$2,$3) RETURNING *`,
        values: [id, type, user_id]
    }
    const { rows } = await db.query(query)
    return rows
}

const updateClientModel = async (id, { type, user_id }) => {
    const query = {
        text: `
        UPDATE client SET type=$1,user_id=$2 WHERE id = $3 RETURNING *`,
        values: [type, user_id, id]
    }
    const { rows } = await db.query(query)
    return rows
}

const deleteClientModel = async ({ id }) => {
    const query = {
        text: `
        DELETE FROM client WHERE id = $1 RETURNING *`,
        values: [id]
    }
    const { rows } = await db.query(query)
    return rows
}

export const clientModel = {
    getClientsModel,
    getClientModel,
    createClientModel,
    updateClientModel,
    deleteClientModel,
}