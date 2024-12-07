import { data } from "../data.js";

export const getUsers = async (req, res) => {
    const user = data.users; 
    const role = data.role;

    const usersRole = user.map(user => {
        const rol = role.find(r => r.id === user.role); 
        return { ...user, role: rol ? rol.name : 'Role not found' };
    });

    res.json(usersRole);
}

export const getUser  = async (req, res) => {
    const { id } = req.params; 
    const users = data.users; 
    const roles = data.role;

    const user = users.find(u => u.id === id); 
    if (!user) {
        return res.status(404).json({ message: "User  not found" });
    }

    const rol = roles.find(r => r.id === user.role); 
    const userWithRole = { ...user, role: rol ? rol.name : 'Role not found' }; 

    res.json(userWithRole); 
}

export const createUser  = async (req, res) => {
    try {
        const userData = req.body; 
        const existingUser  = data.users.find(u => u.email === userData.email); 
        if (existingUser ) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const rol = data.role.find(r => r.id === userData.role); 
        if (!rol) {
            return res.status(400).json({ message: "Role not found" });
        }

        const newUser  = {
            id: (data.users.length + 1).toString(), 
            name: userData.name,
            username: userData.username,
            email: userData.email,
            role: userData.role,
            status: "Active", 
            password: userData.password,
            address: userData.address,
            phone: userData.phone,
            dni: userData.dni,
        };

        data.users.push(newUser ); 
        return res.status(201).json(newUser ); 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}