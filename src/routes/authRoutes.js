import { Router } from 'express'
import { login, register, logout, profile } from "../controllers/authControllers.js";
import { verifyToken } from '../middlewares/jwt.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile', profile);
export default router;
