import { materialModel } from "../models/materialModel.js";

export const getMaterials = async (req, res) => {
    try {
        const material = await materialModel.getMaterialsModel();
        res.json(material);
    } catch (error) {
        console.error('Error fetching material:', error);
        res.status(500).json({ message: 'Error fetching material' });
    }
}

export const getMaterial = async (req, res) => {
    const { id } = req.params;
    try {
        const material = await materialModel.getMaterialModel({ id });
        if (!material || material.length === 0) {
            return res.status(404)
        }
        res.json(material[0]);
    } catch (error) {
        console.error('Error fetching material:', error);
        res.status(500).json({ message: 'Error fetching material' });

    }
}

export const createMaterial = async (req, res) => {
    const database = req.body;
    try {
        const newMaterial = await materialModel.createMaterialModel(database);
        res.status(201).json(newMaterial[0]);
    } catch (error) {
        console.error('Error creating material:', error);
        res.status(500).json({ message: 'Error creating material' });
    }
};

export const deleteMaterial = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMaterial = await materialModel.deleteMaterialModel({ id });
        if (!deletedMaterial || deletedMaterial.length === 0) {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.status(200).json({ message: 'Material successfully deleted' });
    } catch (error) {
        console.error('Error deleting material:', error);
        res.status(500).json({ message: 'Error deleting material' });
    }
};

export const updateMaterial = async (req, res) => {
    const { id } = req.params;
    const database = req.body;
    try {
        const updatedMaterial = await materialModel.updateMaterialModel(id, database);
        if (!updatedMaterial || updatedMaterial.length === 0) {
            return res.status(404).json({ message: 'Material not found' });
        }
        res.json(updatedMaterial[0]);
    } catch (error) {
        console.error('Error updating material:', error);
        res.status(500).json({ message: 'Error updating material' });
    }
};
