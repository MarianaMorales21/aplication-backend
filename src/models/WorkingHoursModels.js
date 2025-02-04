import { db } from '../database/connection.database.js';

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

const createDriverScheduleModel = async ({ id, entry_time, exit_time, day_id, driver_id, schedule_id }) => {
    const query = {
        text: `
        INSERT INTO driver_schedule (id, entry_time, exit_time, day_id, driver_id, schedule_id) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`,
        values: [id, entry_time, exit_time, day_id, driver_id, schedule_id]
    };
    const { rows } = await db.query(query);
    return rows;
};

const updateDriverScheduleModel = async (id, { entry_time, exit_time, day_id, driver_id, schedule_id }) => {
    const query = {
        text: `
        UPDATE driver_schedule 
        SET entry_time = $1, exit_time = $2, day_id = $3, driver_id = $4, schedule_id = $5 
        WHERE id = $6 
        RETURNING *`,
        values: [entry_time, exit_time, day_id, driver_id, schedule_id, id]
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
    deleteDriverScheduleModel
};