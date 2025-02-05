import express from 'express';
import {
    getDriverSchedules,
    getDriverSchedule,
    createDriverSchedule,
    updateDriverSchedule,
    deleteDriverSchedule,
    getDays,
    getSchedules
} from '../controllers/WorkingHoursControllers.js';
import { verifyDriver } from '../middlewares/jwt.js';
const router = express.Router();

router.get('/days', getDays);
router.get('/schedulesO', getSchedules);
router.get('/schedules', getDriverSchedules);
router.get('/schedules/:id', getDriverSchedule);
router.post('/schedules', createDriverSchedule);
router.put('/schedules/:id', updateDriverSchedule);
router.delete('/schedules/:id', deleteDriverSchedule);

export default router;