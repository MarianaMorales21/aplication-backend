import { Router } from "express";
import { getTrucks, getTruck, createTruck, deleteTruck, updateTruck } from "../controllers/flotaControllers.js";

const router = Router();

router.get("/trucks", getTrucks);
router.get('/trucks/:id', getTruck);
router.post('/trucks', createTruck);
router.put("/trucks/:id", updateTruck);
router.delete("/trucks/:id", deleteTruck);

export default router;