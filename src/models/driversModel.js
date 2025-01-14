import { db } from '../database/connection.database.js'

const getDriversModel = async () => {
    const query = {
        text: `
       SELECT * FROM driver`,
        values: []
    }
    const { rows } = await db.query(query)
    return rows
}


const getDriverModel = async ({ id }) => {
    const query = {
        text: `
       SELECT * FROM driver WHERE ID = $1`,
        values: [id]
    }
    const { rows } = await db.query(query)
    return rows
}


const createDriverModel = async ({ id, user_id, limitations, date_of_issue, expiration_date, sex, grade_license }) => {
    const query = {
        text: `
        INSERT INTO driver (id, user_id, limitations, date_of_issue, expiration_date, sex, grade_license ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        values: [id, user_id, limitations, date_of_issue, expiration_date, sex, grade_license]
    }
    const { rows } = await db.query(query)
    return rows
}

const updateDriverModel = async (id, { user_id, limitations, date_of_issue, expiration_date, sex, grade_license }) => {
    const query = {
        text: `
        UPDATE driver SET user_id=$1, limitations=$2, date_of_issue=$3, expiration_date=$4, sex=$5, grade_license=$6 WHERE id = $7 RETURNING *`,
        values: [user_id, limitations, date_of_issue, expiration_date, sex, grade_license, id]
    }
    const { rows } = await db.query(query)
    return rows
}

const deleteDriverModel = async ({ id }) => {
    const query = {
        text: `
        DELETE FROM driver WHERE id = $1 RETURNING *`,
        values: [id]
    }
    const { rows } = await db.query(query)
    return rows
}

export const driverModel = {
    getDriversModel,
    getDriverModel,
    createDriverModel,
    updateDriverModel,
    deleteDriverModel,
}