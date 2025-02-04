import express from 'express';
import {
    getDriverSchedules,
    getDriverSchedule,
    createDriverSchedule,
    updateDriverSchedule,
    deleteDriverSchedule
} from '../controllers/WorkingHoursControllers.js';
import { verifyDriver } from '../middlewares/jwt.js';
const router = express.Router();

router.get('/schedules', verifyDriver, getDriverSchedules);
router.get('/schedules/:id', verifyDriver, getDriverSchedule);
router.post('/schedules', verifyDriver, createDriverSchedule);
router.put('/schedules/:id', verifyDriver, updateDriverSchedule);
router.delete('/schedules/:id', verifyDriver, deleteDriverSchedule);

export default router;