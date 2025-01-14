import { driverModel } from '../models/driversModel.js';


export const getDrivers = async (req, res) => {
    try {
        const drivers = await driverModel.getDriversModel();
        res.json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).json({ message: 'Error fetching drivers' });
    }
};


export const getDriver = async (req, res) => {
    const { id } = req.params;
    try {
        const driver = await driverModel.getDriverModel({ id });
        if (!driver || driver.length === 0) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json(driver[0]);
    } catch (error) {
        console.error('Error fetching driver:', error);
        res.status(500).json({ message: 'Error fetching driver' });
    }
};

export const createDriver = async (req, res) => {
    const database = req.body;
    try {
        const newDriver = await driverModel.createDriverModel(database);
        res.status(201).json(newDriver[0]);
    } catch (error) {
        console.error('Error creating driver:', error);
        res.status(500).json({ message: 'Error creating driver' });
    }
};

export const deleteDriver = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDriver = await driverModel.deleteDriverModel({ id });
        if (!deletedDriver || deletedDriver.length === 0) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.status(200).json({ message: 'Driver  successfully deleted' });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).json({ message: 'Error deleting driver' });
    }
};


export const updateDriver = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {
        const updatedDriver = await driverModel.updateDriverModel(id, database);
        if (!updatedDriver || updatedDriver.length === 0) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json(updatedDriver[0]);
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ message: 'Error updating driver' });
    }
};