import { db } from '../database/connection.database.js'

const getFlotasModel = async () => {
    const query = {
        text: `
       SELECT * FROM truck`,
        values: []
    }
    const { rows } = await db.query(query)
    return rows
}

const getModelModel = async () => {
    const query = {
        text: `
       SELECT * FROM model`,
        values: []
    }
    const { rows } = await db.query(query)
    return rows
}


const getFlotaModel = async ({ id }) => {
    const query = {
        text: `
       SELECT * FROM truck WHERE ID = $1`,
        values: [id]
    }
    const { rows } = await db.query(query)
    return rows
}


const createFlotaModel = async ({ id, driver_id, operational, usage_reports, mileage, model_id }) => {
    const query = {
        text: `
        INSERT INTO truck (id, driver_id, operational, usage_reports, mileage, model_id ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        values: [id, driver_id, operational, usage_reports, mileage, model_id]
    }
    const { rows } = await db.query(query)
    return rows
}

const updateFlotaModel = async (id, { driver_id, operational, usage_reports, mileage, model_id }) => {
    const query = {
        text: `
        UPDATE truck SET driver_id=$1, operational=$2, usage_reports=$3, mileage=$4, model_id=$5 WHERE id = $6 RETURNING *`,
        values: [driver_id, operational, usage_reports, mileage, model_id, id]
    }
    const { rows } = await db.query(query)
    return rows
}

const deleteFlotaModel = async ({ id }) => {
    const query = {
        text: `
        DELETE FROM truck WHERE id = $1 RETURNING *`,
        values: [id]
    }
    const { rows } = await db.query(query)
    return rows
}

export const fleetModel = {
    getFlotaModel,
    getFlotasModel,
    deleteFlotaModel,
    createFlotaModel,
    updateFlotaModel,
    getModelModel,
}