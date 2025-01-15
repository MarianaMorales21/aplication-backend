import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No user is logged in" });
    }

    try {
        const decoded = jwt.verify(token, process.env.PALABRASECRETA || 'secret123');
        req.username = decoded.username;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};
/*{
    "username": "Marisca",
    "password": "marisca123"
}
{
    "name": "Mariana Morales",
    "username": "mariana123456",
    "email": "park68835-th@huskrm.com",
    "role": "Client",
    "status": "Active",
    "password": "mariana123456",
    "address": "sdfsdf",
    "phone": "04121617297",
    "dni": "30781815"
}*/