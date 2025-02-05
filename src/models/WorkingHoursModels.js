import { db } from '../database/connection.database.js';

const getDaysModel = async () => {
    const query = {
        text: `SELECT * FROM day`,
        values: []
    };
    const { rows } = await db.query(query);
    return rows;
};

const getDriverSchedulesModel = async () => {
    const query = {
        text: `SELECT * FROM driver_schedule`,
        values: []
    };
    const { rows } = await db.query(query);
    return rows;
};

const getDriverScheduleModel = async (id) => {
    const query = {
        text: `SELECT * FROM driver_schedule WHERE id = $1`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const createDriverScheduleModel = async ({ entry_time, exit_time, day_id, driver_id }) => {
    const query = {
        text: `
        INSERT INTO driver_schedule (entry_time, exit_time, day_id, driver_id) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
        values: [entry_time, exit_time, day_id, driver_id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const updateDriverScheduleModel = async (id, { entry_time, exit_time, day_id, driver_id }) => {
    const query = {
        text: `
        UPDATE driver_schedule 
        SET entry_time = $1, exit_time = $2, day_id = $3, driver_id = $4
        WHERE id = $5 
        RETURNING *`,
        values: [entry_time, exit_time, day_id, driver_id, id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const deleteDriverScheduleModel = async (id) => {
    const query = {
        text: `DELETE FROM driver_schedule WHERE id = $1 RETURNING *`,
        values: [id]
    };
    const { rows } = await db.query(query);
    return rows;
};

export const driverScheduleModel = {
    getDriverSchedulesModel,
    getDriverScheduleModel,
    createDriverScheduleModel,
    updateDriverScheduleModel,
    deleteDriverScheduleModel,
    getDaysModel,
};