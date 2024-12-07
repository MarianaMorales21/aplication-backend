import { data } from "../data.js";

export const getClients = async (req, res) => {
    const users = data.users; 
    const clients = data.client;

    const userClients = clients.map(client => {
        const user = users.find(r => r.id === client.user_id); 
        return { ...client, user_id: user ? user.name : 'User  not found' }; 
    });

    res.json(userClients);
}

export const getClient  = async (req, res) => {
    const { id } = req.params; 
    const users = data.users; 
    const clients = data.client;

    const client = clients.find(c => c.id === id); 
    if (!client) {
        return res.status(404).json({ message: "Client not found" }); 
    }

    const user = users.find(r => r.id === client.user_id); 
    const userClient = { ...client, user_id: user ? user.name : 'User  not found' }; 

    res.json(userClient); 
}

export const createClient = async (req, res) => {
    try {
        const clientData = req.body; 

        const user = data.users.find(r => r.id === clientData.user_id); 
        if (!user) {
            return res.status(400).json({ message: "User  not found" });
        }

        const newClient = {
            id: (data.client.length + 1).toString(), 
            user_id: clientData.user_id,
            type: clientData.type
        };

        data.client.push(newClient); 
        return res.status(201).json(newClient); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}