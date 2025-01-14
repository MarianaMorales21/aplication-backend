import { userModel } from '../models/userModel.js';

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.getUsersModel();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.getUserModel({ id });
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
};

export const createUser = async (req, res) => {
    const database = req.body;
    try {
        const newUser = await userModel.createUserModel(database);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const deleteUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await userModel.deleteUserModel({ id });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(200).json({ message: 'User  successfully deleted' });;
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {
        const updatedUser = await userModel.updateUserModel(id, database);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
};