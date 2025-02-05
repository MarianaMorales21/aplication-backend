import User from '../models/usersORM.js';
import Driver from '../models/driversORM.js';


export const getUsersWithDrivers = async (req, res) => {
    try {
        const usersWithDrivers = await User.findAll({
            include: [{
                model: Driver,
                required: true,
            }],
        });
        res.json(usersWithDrivers);
    } catch (error) {
        console.error('Error fetching users with drivers:', error);
        res.status(500).json({ message: 'Error fetching users with drivers', error: error.message });
    }
};


export const getUsersWithOptionalDrivers = async (req, res) => {
    try {
        const usersWithOptionalDrivers = await User.findAll({
            include: [{
                model: Driver,
                required: false,
            }],
        });
        res.json(usersWithOptionalDrivers);
    } catch (error) {
        console.error('Error fetching users with optional drivers:', error);
        res.status(500).json({ message: 'Error fetching users with optional drivers', error: error.message });
    }
};


export const getDriversWithUsers = async (req, res) => {
    try {
        const driversWithUsers = await Driver.findAll({
            include: [{
                model: User,
                required: true,
            }],
        });
        res.json(driversWithUsers);
    } catch (error) {
        console.error('Error fetching drivers with users:', error);
        res.status(500).json({ message: 'Error fetching drivers with users', error: error.message });
    }
};