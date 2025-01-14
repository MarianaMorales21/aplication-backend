import { Router } from "express";
import { getDrivers, getDriver, createDriver, deleteDriver, updateDriver } from "../controllers/driversControllers.js";

const router = Router();

router.get("/drivers", getDrivers);
router.get('/drivers/:id', getDriver);
router.post('/drivers', createDriver);
router.put("/drivers/:id", updateDriver);
router.delete("/drivers/:id", deleteDriver);

export default router;