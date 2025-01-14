import { clientModel } from '../models/clientModel.js';

export const getClients = async (req, res) => {
    try {
        const clients = await clientModel.getClientsModel();
        res.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: 'Error fetching clients' });
    }
};


export const getClient = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await clientModel.getClientModel({ id });
        if (!client || client.length === 0) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client[0]);
    } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json({ message: 'Error fetching client' });
    }
};


export const createClient = async (req, res) => {
    const database = req.body;
    try {
        const newClient = await clientModel.createClientModel(database);
        res.status(201).json(newClient[0]);
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Error creating client' });
    }
};


export const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClient = await clientModel.deleteClientModel({ id });
        if (!deletedClient || deletedClient.length === 0) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client  successfully deleted' });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ message: 'Error deleting client' });
    }
};


export const updateClient = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {
        const updatedClient = await clientModel.updateClientModel(id, database);
        if (!updatedClient || updatedClient.length === 0) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(updatedClient[0]);
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ message: 'Error updating client' });
    }
};