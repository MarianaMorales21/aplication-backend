import express from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUsers } from '../controllers/usersORMC.js';

const router = express.Router();

router.get('/ormusers', getUsers);
router.get('/ormusers/:id', getUser);
router.post('/ormusers', createUser);
router.put('/ormusers/:id', updateUser);
router.delete('/ormusers/:id', deleteUsers);

export default router;