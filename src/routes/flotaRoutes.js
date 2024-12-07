import { Router } from "express";
import { getTrucks, getTruck, createTruck} from "../controllers/flotaControllers.js";

const router = Router();

router.get("/trucks", getTrucks);
router.get('/trucks/:id', getTruck );
router.post('/trucks', createTruck );

export default router;