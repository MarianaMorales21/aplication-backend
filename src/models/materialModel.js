import { text } from 'express'
import { db } from '../database/connection.database.js'

const getMaterialsModel = async () => {
    const query = {
        text: `
        SELECT * FROM material
        `,
        values: []
    }
    const { rows } = await db.query(query)
    return rows
}

const getMaterialModel = async ({ id }) => {
    const query = {
        text: `SELECT * FROM material WHERE id=$1`,
        values: [id]
    }
    const { rows } = await db.query(query)
    return rows
}

const createMaterialModel = async ({ id, name, characteristics, cost_per_unit, cost_per_kilometer, status }) => {
    const query = {
        text: `
        INSERT INTO material (id, name, characteristics, cost_per_unit, cost_per_kilometer, status) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`,
        values: [id, name, characteristics, cost_per_unit, cost_per_kilometer, status]
    };

    const { rows } = await db.query(query);
    return rows;
};

const updateMaterialModel = async (id, { name, characteristics, cost_per_unit, cost_per_kilometer, status }) => {
    const query = {
        text: `
        UPDATE material 
        SET name = $1, characteristics = $2, cost_per_unit = $3, cost_per_kilometer = $4, status = $5 
        WHERE id = $6 
        RETURNING *`,
        values: [name, characteristics, cost_per_unit, cost_per_kilometer, status, id]
    };

    const { rows } = await db.query(query);
    return rows;
};
const deleteMaterialModel = async ({ id }) => {
    const query = {
        text: `
        DELETE FROM material 
        WHERE id = $1 
        RETURNING *`,
        values: [id]
    };

    const { rows } = await db.query(query);
    return rows;
};

export const materialModel = {
    getMaterialModel,
    getMaterialsModel,
    updateMaterialModel,
    deleteMaterialModel,
    createMaterialModel,
}

