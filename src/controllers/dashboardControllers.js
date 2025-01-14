import { getDashboardData } from '../models/dashboardModel.js';

export const getDashboard = async (req, res) => {
    try {
        const dashboardData = await getDashboardData();
        res.status(200).json(dashboardData);
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

