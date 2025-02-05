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
router.use(verifyToken);

router.get("/users", verifyAdmin, getUsers);
router.get("/users/:id", verifyAdmin, getUser);
router.post("/users", verifyAdmin, createUser);
router.put("/users/:id", verifyAdmin, updateUser);
router.delete("/users/:id", verifyAdmin, deleteUsers);

export default router;