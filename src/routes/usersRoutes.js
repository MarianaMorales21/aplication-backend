import { Router } from "express";
import { getUsers, getUser , createUser  } from "../controllers/usersControllers.js";

const router = Router();

router.get("/users", getUsers);
router.get('/users/:id', getUser );
router.post('/users', createUser );

export default router;