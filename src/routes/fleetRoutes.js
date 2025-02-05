import { Router } from "express";
import { getTrucks, getTruck, createTruck, deleteTruck, updateTruck, getModel } from "../controllers/fleetControllers.js";
import { verifyDriver, verifyAdmin } from "../middlewares/jwt.js";
const router = Router();


router.get("/model", getModel);
router.get("/trucks", getTrucks);
router.get('/trucks/:id', getTruck);
router.post('/trucks', createTruck);
router.put("/trucks/:id", updateTruck);
router.delete("/trucks/:id", deleteTruck);

export default router;