import { Router } from "express";
import { getDrivers, getDriver, createDriver} from "../controllers/driversControllers.js";

const router = Router();

router.get("/drivers", getDrivers);
router.get('/drivers/:id', getDriver );
router.post('/drivers', createDriver );

export default router;