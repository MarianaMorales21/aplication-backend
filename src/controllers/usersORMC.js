import User from '../models/usersORM.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

export const createUser = async (req, res) => {
    const { password, ...otherData } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ ...otherData, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { password, ...otherData } = req.body;
    try {
        let updatedUser;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedUser = await User.update({ ...otherData, password: hashedPassword }, { where: { id } });
        } else {
            updatedUser = await User.update(otherData, { where: { id } });
        }

        if (!updatedUser[0]) {
            return res.status(404).json({ message: 'User  not found' });
        }
        const user = await User.findByPk(id);
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

export const deleteUsers = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.destroy({ where: { id } });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(200).json({ message: 'User  successfully deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};