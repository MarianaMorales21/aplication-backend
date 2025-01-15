import { db } from '../database/connection.database.js'

export const getDashboardData = async () => {
    const result = await db.query(`
        SELECT 
            COUNT(*) AS total_Users,
            SUM(CASE WHEN role = 'Client' THEN 1 ELSE 0 END) AS client_Count,
            SUM(CASE WHEN role  = 'Driver' THEN 1 ELSE 0 END) AS driver_Count,
            SUM(CASE WHEN role  = 'Administrator' THEN 1 ELSE 0 END) AS administrator_Count,
            (SELECT COUNT(*) FROM truck) AS truck_Count
        FROM users;
    `);
    return result.rows[0];
};

