import { Router } from "express";
import { getDashboard } from '../controllers/dashboardControllers.js';

const router = Router();

router.get('/dashboard', getDashboard);
export default router;