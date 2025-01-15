import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: "No token provided" });
    }

    token = token.split(" ")[1]

    try {

        const { username } = jwt.verify(token, 'secret123');
        req.username = username
        next();
    } catch (error) {
        return res.status(400).send({ message: "Invalid token" });

    }


}