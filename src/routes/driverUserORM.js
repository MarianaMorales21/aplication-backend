import express from 'express';
import { getUsersWithDrivers, getUsersWithOptionalDrivers, getDriversWithUsers } from '../controllers/driverUsersORM.js';

const router = express.Router();

router.get('/users-with-drivers', getUsersWithDrivers);
router.get('/users-with-optional-drivers', getUsersWithOptionalDrivers);
router.get('/drivers-with-users', getDriversWithUsers);

export default router;