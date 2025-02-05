import { fleetModel } from '../models/fleetModel.js';

export const getTrucks = async (req, res) => {
    try {
        const trucks = await fleetModel.getFlotasModel();
        res.json(trucks);
    } catch (error) {
        console.error('Error fetching trucks:', error);
        res.status(500).json({ message: 'Error fetching trucks' });
    }
};

export const getModel = async (req, res) => {
    try {
        const model = await fleetModel.getModelModel();
        res.json(model);
    } catch (error) {
        console.error('Error fetching trucks:', error);
        res.status(500).json({ message: 'Error fetching trucks' });
    }
};

export const getTruck = async (req, res) => {
    const { id } = req.params;
    try {
        const truck = await fleetModel.getFlotaModel({ id });
        if (!truck || truck.length === 0) {
            return res.status(404).json({ message: 'Truck not found' });
        }
        res.json(truck[0]);
    } catch (error) {
        console.error('Error fetching truck:', error);
        res.status(500).json({ message: 'Error fetching truck' });
    }
};

export const createTruck = async (req, res) => {
    const database = req.body;
    try {
        const newTruck = await fleetModel.createFlotaModel(database);
        res.status(201).json(newTruck[0]);
    } catch (error) {
        console.error('Error creating truck:', error);
        res.status(500).json({ message: 'Error creating truck' });
    }
};

export const deleteTruck = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTruck = await fleetModel.deleteFlotaModel({ id });
        if (!deletedTruck || deletedTruck.length === 0) {
            return res.status(404).json({ message: 'Truck not found' });
        }
        res.status(200).json({ message: 'Truck  successfully deleted' });
    } catch (error) {
        console.error('Error deleting truck:', error);
        res.status(500).json({ message: 'Error deleting truck' });
    }
};


export const updateTruck = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {
        const updatedTruck = await fleetModel.updateFlotaModel(id, database);
        if (!updatedTruck || updatedTruck.length === 0) {
            return res.status(404).json({ message: 'Truck not found' });
        }
        res.json(updatedTruck[0]);
    } catch (error) {
        console.error('Error updating truck:', error);
        res.status(500).json({ message: 'Error updating truck' });
    }
};