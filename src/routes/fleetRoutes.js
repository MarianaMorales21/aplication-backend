import { Router } from "express";
import { getTrucks, getTruck, createTruck, deleteTruck, updateTruck } from "../controllers/fleetControllers.js";
import { verifyDriver, verifyAdmin } from "../middlewares/jwt.js";
const router = Router();

router.get("/trucks", verifyDriver, getTrucks);
router.get('/trucks/:id', verifyDriver, getTruck);
router.post('/trucks', verifyAdmin, createTruck);
router.put("/trucks/:id", verifyAdmin, updateTruck);
router.delete("/trucks/:id", verifyAdmin, deleteTruck);

export default router;