import { Router } from "express";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUsers,
} from "../controllers/usersControllers.js";

export const router = Router();
import { verifyAdmin, verifyToken } from '../middlewares/jwt.js';


router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUsers);

export default router;