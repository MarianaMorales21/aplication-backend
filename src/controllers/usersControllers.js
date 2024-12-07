import { data } from "../data.js";

export const getUsers = async (req, res) => {
    const usuarios = data.users; 
    const roles = data.role;

    const usuariosConRoles = usuarios.map(usuario => {
        const rol = roles.find(r => r.id === usuario.role); 
        return { ...usuario, role: rol ? rol.name : 'Rol no encontrado' };
    });

    res.json(usuariosConRoles);
}


export const getUser  = async (req, res) => {
    const { id } = req.params; 
    const usuarios = data.users; 
    const roles = data.role;

    const usuario = usuarios.find(u => u.id === id); 
    if (!usuario) {
        return res.status(404).json({ message: "User  not found" });
    }

    const rol = roles.find(r => r.id === usuario.role); 
    const usuarioConRol = { ...usuario, role: rol ? rol.name : 'Rol no encontrado' }; 

    res.json(usuarioConRol); 
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
            return res.status(400).json({ message: "Rol no encontrado" });
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