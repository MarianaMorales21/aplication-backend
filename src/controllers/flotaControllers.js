import { data } from "../data.js";

export const getTrucks = async (req, res) => {
    try {
        const users = data.users; 
        const drivers = data.driver;
        const models = data.model;
        const trucks = data.truck;
        
        const flota = trucks.map(truck => {
            const driver = drivers.find(d => d.id === truck.driver_id);
            const user = driver ? users.find(u => u.id === driver.user_id) : null; 
            const model = models.find(m => m.id === truck.model_id);
            return {
                truck_id: truck.id,
                driver_id: user ? user.name : 'Driver not found', 
                model_id: model ? model.name_brand : 'Model not found', 
                operational: truck.operational,
                usage_reports: truck.usage_reports,
                mileage: truck.mileage,
            };
        });
        res.json(flota);
    } catch (error) {
        console.error("Error fetching trucks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getTruck = async (req, res) => {
    try {
        const { id } = req.params; 
        const users = data.users; 
        const drivers = data.driver;
        const models = data.model;
        const trucks = data.truck;

        const truck = trucks.find(t => t.id === id); 
        if (!truck) {
            return res.status(404).json({ message: "Truck not found" }); 
        }

        const driver = drivers.find(d => d.id === truck.driver_id);
        const user = driver ? users.find(u => u.id === driver.user_id) : null; 
        const model = models.find(m => m.id === truck.model_id);
        
        const flota = { 
            truck_id: truck.id,
            driver_name: user ? user.name : 'Driver not found', 
            model_name: model ? model.name_brand : 'Model not found', 
            operational: truck.operational,
            usage_reports: truck.usage_reports,
            mileage: truck.mileage, 
        }; 

        res.json(flota); 
    } catch (error) {
        console.error("Error fetching truck:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createTruck = async (req, res) => {
    try {
        const truckData = req.body; 

        const driver = data.driver.find(d => d.id === truckData.driver_id); 
        if (!driver) {
            return res.status(400).json({ message: "Driver not found" });
        }

        const model = data.model.find(m => m.id === truckData.model_id);
        if (!model) {
            return res.status(400).json({ message: "Model not found" });
        }

        const newTruck = {
            id: (data.truck.length + 1).toString(),
            driver_id: truckData.driver_id,
            operational: truckData.operational, 
            usage_reports: truckData.usage_reports, 
            mileage: truckData.mileage, 
            model_id: truckData.model_id 
        };

        data.truck.push(newTruck); 
        return res.status(201).json(newTruck); 
    } catch (error) {
        console.error("Error creating truck:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}