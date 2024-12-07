import { data } from "../data.js";

export const getDrivers = async (req, res) => {
    const users = data.users; 
    const drivers = data.driver;

    const userDrivers = drivers.map(driver => {
        const user = users.find(r => r.id === driver.user_id); 
        return { ...driver, user_id: user ? user.name : 'User  not found' };
    });

    res.json(userDrivers);
}

export const getDriver  = async (req, res) => {
    const { id } = req.params; 
    const users = data.users; 
    const drivers = data.driver;

    const driver = drivers.find(u => u.id === id); 
    if (!driver) {
        return res.status(404).json({ message: "User  not found" });
    }

    const user = users.find(r => r.id === driver.user_id); 
    const userDriver = { ...driver, user_id: user ? user.name : 'User  not found' }; 

    res.json(userDriver); 
}

export const createDriver = async (req, res) => {
    try {
        const driverData = req.body; 

        const user = data.users.find(r => r.id === driverData.user_id); 
        if (!user) {
            return res.status(400).json({ message: "User  not found" });
        }

        const newDriver = {
            id: (data.driver.length + 1).toString(), 
            user_id: driverData.user_id,
            limitations: driverData.limitations,
            date_of_issue: driverData.date_of_issue,
            expiration_date: driverData.expiration_date,
            sex: driverData.sex,
            grade_license: driverData.grade_license
        };

        data.driver.push(newDriver); 
        return res.status(201).json(newDriver); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}