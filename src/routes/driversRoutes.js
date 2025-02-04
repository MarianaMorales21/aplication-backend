import { Router } from "express";
import { getDrivers, getDriver, createDriver, deleteDriver, updateDriver } from "../controllers/driversControllers.js";
import { verifyDriver, verifyAdmin } from "../middlewares/jwt.js";
const router = Router();

router.get("/drivers", verifyDriver, getDrivers);
router.get('/drivers/:id', verifyDriver, getDriver);
router.post('/drivers', verifyAdmin, createDriver);
router.put("/drivers/:id", verifyAdmin, updateDriver);
router.delete("/drivers/:id", verifyAdmin, deleteDriver);

export default router;