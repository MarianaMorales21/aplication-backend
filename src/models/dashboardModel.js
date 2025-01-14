import { pool } from '../db.js';

export const getDashboardData = async () => {
    const result = await pool.query(`
        SELECT 
            COUNT(*) AS total_users,
            SUM(CASE WHEN user_type = 'client' THEN 1 ELSE 0 END) AS client_count,
            SUM(CASE WHEN user_type = 'driver' THEN 1 ELSE 0 END) AS driver_count,
            (SELECT COUNT(*) FROM trucks) AS truck_count
        FROM users;
    `);
    return result.rows[0];
};

