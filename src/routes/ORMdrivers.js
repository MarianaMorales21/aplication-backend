import express from 'express';
import { createDriver, getDrivers, getDriver, updateDriver, deleteDriver } from '../controllers/driversORMC.js';

const router = express.Router();

router.post('/ormdriver', createDriver);
router.get('/ormdriver', getDrivers);
router.get('/ormdriver/:id', getDriver);
router.put('/ormdriver/:id', updateDriver);
router.delete('/ormdriver/:id', deleteDriver);

export default router;

