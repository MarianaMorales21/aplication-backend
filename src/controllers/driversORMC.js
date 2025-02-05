import Driver from '../models/driversORM.js';

export const createDriver = async (req, res) => {
    const database = req.body;
    try {
        const newDriver = await Driver.create(database);
        res.status(201).json(newDriver);
    } catch (error) {
        console.error('Error creating driver:', error);
        res.status(400).json({ message: 'Error creating driver', error: error.message });
    }
};

export const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.findAll();
        res.json(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
        res.status(500).json({ message: 'Error fetching drivers', error: error.message });
    }
};


export const getDriver = async (req, res) => {
    const { id } = req.params;
    try {
        const driver = await Driver.findByPk(id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.json(driver);
    } catch (error) {
        console.error('Error fetching driver:', error);
        res.status(500).json({ message: 'Error fetching driver', error: error.message });
    }
};


export const updateDriver = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {
        const [updated] = await Driver.update(database, { where: { id } });
        if (!updated) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        const updatedDriver = await Driver.findByPk(id);
        res.json(updatedDriver);
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ message: 'Error updating driver', error: error.message });
    }
};

export const deleteDriver = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Driver.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        res.status(200).json({ message: 'Driver successfully deleted' });
    } catch (error) {
        console.error('Error deleting driver:', error);
        res.status(500).json({ message: 'Error deleting driver', error: error.message });
    }
};